import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { forkJoin, Observable } from 'rxjs';

interface FirestoreItem {
  id: number;
  name: string;
  description?: string;
  imageDownloadURL: string;
}

interface FirestoreCollection {
  id: string;
  question: string;
  data: Array<FirestoreItem>;
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
}

@Injectable({
  providedIn: 'root'
})
export class RankerServiceService {

  //https://medium.com/@AnkitMaheshwariIn/how-to-upload-and-display-image-file-in-pwa-angular-project-using-firebase-cloud-storage-and-95763bc83da7
  uploadImage(file: File): Observable<string> {
    // create a random id

    return new Observable<any>((observer) => {
      const filePath = `Images/${Date.now()}`;
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
          console.log(downloadURL);
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
    const ref = await this.db.collection('EasyRankingCollection').add({...newCollection, data: firestoreItems});
    return ref.id;

  }

  /** uploadRanking
   * uploads a ranking to the database
   * @param newRanking 
   * @returns Promise<string> of the auto generated ID of the ranking for link sharing
   */
  async uploadRanking(newRanking: Rank): Promise<string> {
    const ref = await this.db.collection('EasyRankingRanks').add(newRanking);
    return ref.id;
  }

}