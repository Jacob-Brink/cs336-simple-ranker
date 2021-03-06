import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { forkJoin, Observable, } from 'rxjs';

import { first, take } from 'rxjs/operators';

export interface FirestoreItem {
  id: number;
  name: string;
  description?: string;
  imageDownloadURL: string;
}

interface ItemScore {
  id: number;
  averagePosition: null | number;
}

export interface FirestoreCollection {
  id: string;
  question: string;
  data: Array<FirestoreItem>;
  timeStamp: number;
  averageRanking: Array<ItemScore>;
  rankings: number;
}

export interface Item {
  id: number;
  name: string;
  description?: string;
  image: File;
}

export interface Collection {
  id: string;
  question: string;
  data: Array<Item>;
}

export interface Rank {
  id: string;
  collectionID: string;
  data: Array<number>;
  timeStamp: number;
}

export interface FirestorePage {
  collectionName: string;
  sortMethod: string;
  limit: number;
  direction: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root'
})
export class RankerServiceService {

  sortMethod: string;
  limit: number;
  pageCollectionRef: any;
  collectionName: string;

  getNextPage(pageData: FirestorePage, lastValue) {
    return this.db.collection(pageData.collectionName).ref.orderBy(pageData.sortMethod).startAfter(lastValue).limit(pageData.limit);
  }

  getPreviousPage(pageData: FirestorePage, firstValue) {
    return this.db.collection(pageData.collectionName).ref.orderBy(pageData.sortMethod).endBefore(firstValue).limit(pageData.limit);
  }

  getPage(pageData: FirestorePage) {
    return new Observable(observer => {
      this.db.collection(pageData.collectionName).ref.get().then(data => {
        const collection = [];
        data.forEach(item => {
          console.log(item.data());
          collection.push(item.data());
        });

        observer.next(collection);
        observer.complete();
      }); 
    })  
  }

  //https://medium.com/@AnkitMaheshwariIn/how-to-upload-and-display-image-file-in-pwa-angular-project-using-firebase-cloud-storage-and-95763bc83da7
  uploadImage(file: File): Observable<string> {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);

    return new Observable<any>((observer) => {
      const filePath = `Images/${Date.now()}${randomId}`;
      this.afStorage.upload(filePath, file).then(data => {
        data.ref.getDownloadURL().then(url => {
          observer.next(url);
          observer.complete();
        });
      });
    });
    
  }

  constructor(private db: AngularFirestore, private afStorage: AngularFireStorage) { }

  /** getCollection
   * returns collection 
   * @param collectionID 
   */
  getCollection(collectionID: string): Observable<FirestoreCollection> {
    return this.db.doc<FirestoreCollection>(`/EasyRankingCollection/${collectionID}`).valueChanges();
  }

  /** getRanking
   * returns ranking
   * @param rankID 
   */
  getRanking(rankID: string): Observable<Rank> {
    return this.db.doc<Rank>(`/EasyRankingRanks/${rankID}`).valueChanges();
  }



  /** uploadCollection
   * takes a collection and uploads it to the database handling image uploads and returning the auto generated ID for link sharing
   * @param newCollection 
   */
  async uploadCollection(newCollection: Collection): Promise<string> {

    // upload images and get download urls
    let itemUploads = newCollection.data.map(item => {
      return new Observable<FirestoreItem>((observer) => {
        this.uploadImage(item.image).subscribe(downloadURL => {
          // convert item to firestore item by using the downloadURL of the image uploaded on our cloud storage
          const firestoreItem: FirestoreItem = {
            id: item.id,
            name: item.name,
            description: item.description,
            imageDownloadURL: downloadURL,
          };

          // send the value (next) and inform forkJoin that this is the last value sent (complete)
          observer.next(firestoreItem);
          observer.complete();
        });
      });
    });

    // once all images have been uploaded and the download url's are received, upload the collection to the firebase
    const firestoreItems: Array<FirestoreItem> = await forkJoin(itemUploads).toPromise();
    const ref = await this.db.collection('EasyRankingCollection').add({...newCollection, data: firestoreItems, timeStamp: Date.now(), rankings: 0, averageRanking: firestoreItems.map(item => {
      return {
        id: item.id,
        averagePosition: 0,
      }
    })});

    this.db.doc<FirestoreCollection>(`/EasyRankingCollection/${ref.id}`).update({id: ref.id});
    console.log(ref.id);
    return ref.id;

  }

  /** uploadRanking
   * uploads a ranking to the database
   * @param newRanking 
   * @returns Promise<string> of the auto generated ID of the ranking for link sharing
   */
  async uploadRanking(newRanking: Rank): Promise<string> {
    const ref = await this.db.collection('EasyRankingRanks').add(newRanking);
    const doc = this.db.doc<FirestoreCollection>(`/EasyRankingCollection/${newRanking.collectionID}`);
    
    doc.valueChanges().pipe(first()).subscribe(collection => {
      console.log("hey");
      console.log(collection);
      doc.update({averageRanking: collection.averageRanking.map(itemAverage => {
        return {
          id: itemAverage.id,
          averagePosition: itemAverage.averagePosition * (collection.rankings) / (collection.rankings + 1) + newRanking.data[itemAverage.id] / (collection.rankings+1)
        }
      }),
      rankings: collection.rankings+1,
    })
    })
    return ref.id;
  }

}
