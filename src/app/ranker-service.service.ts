import { Injectable } from '@angular/core';

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

  fakeCollectionID: string = '3J4ITH#F';

  fakeCollection: Collection = {
    id: this.fakeCollectionID,
    question: 'Which dog looks cuter?',
    data: [
      {
        id: 0,
        name: 'Lab',
        description: 'Cutest dog around',
        image: null,
      },
      {
        id: 1,
        name: 'Husky',
        description: 'Fierce guard dog who never lets you down',
        image: null,
      },
      {
        id: 2,
        name: 'Prairie Dog',
        description: 'Dog?',
        image: null,
      },
      {
        id: 3,
        name: 'Wolf',
        description: 'Just an untamed dog that definitely will not stoop so low as to play fetch',
        image: null,
      },
    ]
  }

  fakeRanking: Rank = {
    id: 'JH%@NGG',
    collectionID: this.fakeCollectionID,
    data: [2, 1, 0, 3]
  }

  constructor() { }

  getCollection(collectionID: string): Collection {
    return this.fakeCollection;
  }

  getRanking(rankID: string): Rank {
    return this.fakeRanking;
  }

  uploadCollection(newCollection: Collection): string {
    return '4##45%';
  }

  uploadRanking(newRanking: Rank): string {
    return 'JSDOI%$#';
  }

}
