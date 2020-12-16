import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FirestoreItem,
  RankerServiceService
} from 'src/app/ranker-service.service';
import { ItemCardComponent } from '../item-card/item-card.component';
// import { item } from "../QuizPageComponent";

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private rankerService: RankerServiceService,
    private router: Router
  ) {}

  pivot: item;
  insertedItem: item;

  low: number = -1; // current index of lower bound
  high: number = 0; // current index of upper bound
  data: item[] = []; // items to be ranked
  ranked: item[] = []; // currently ranked items
  display: item[] = [];
  question: string = 'Which is better?';
  completed: boolean = false;
  collectionID: string = '';

  // get new pivot point
  getNewPivot(): item {
    return this.ranked[Math.floor((this.high - this.low) / 2) + this.low];
  }

  // update display either when item is inserted or next pivot item has to be found
  updateDisplay(): void {
    this.display = [this.pivot, this.insertedItem];
  }

  // logic that deals with inserting new component into the ranked list.
  reorder(thing: item) {
    if (this.completed) {
      return;
    }

    if (this.pivot) {
      const pivotIndex = this.ranked.findIndex(rankedItem => {
        return rankedItem.id === this.pivot.id;
      });

      // update boundary
      if (thing.id === this.pivot.id) {
        // pivot is higher than inserted item
        this.high = pivotIndex;
      } else {
        // pivot is lower than inserted item
        this.low = pivotIndex;
      }
    }

    // check if item can be inserted into ranked array
    if (Math.abs(this.high - this.low) === 1) {
      // found index for inserting

      // 1. insert item
      this.ranked.splice(this.high, 0, this.insertedItem);

      // 2. update lower and upper bounds
      this.low = -1;
      this.high = this.ranked.length;

      // 3. update insertedItem
      const newItem = this.data.pop();

      if (newItem) {
        this.insertedItem = newItem;
      } else {
        console.log(this.ranked);
        this.rankerService
          .uploadRanking({
            id: 'not needed',
            collectionID: this.collectionID,
            data: this.ranked.map(item => {
              return item.id;
            }),
            timeStamp: Date.now()
          })
          .then(rankID => {
            this.router.navigateByUrl('/final?rankid=' + rankID);
          });
        this.completed = true;
        return;
      }
    }

    this.pivot = this.getNewPivot();
    this.updateDisplay();
  }

  // function that loads data from cloud firebase storage. Data includes the collection of items, each with a picture, name, id and optional description
  loadData(collectionID: string): void {
    this.rankerService.getCollection(collectionID).subscribe(val => {
      if (val === undefined) {
        console.log('invalid collection ID');
      } else {
        // in case collection is retreived, set data to collection
        this.collectionID = collectionID;
        this.question = val.question;
        this.data = val.data.map((firestoreItem: FirestoreItem) => {
          return {
            id: firestoreItem.id,
            name: firestoreItem.name,
            link: firestoreItem.imageDownloadURL,
            description: firestoreItem.description
          };
        });

        this.insertedItem = this.data.pop();

        this.reorder(this.insertedItem);
      }
    });
  }

  // This refreshes the whole ranked/data stuff
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const collectionID = params['collectionid'];
      if (collectionID) {
        this.loadData(collectionID);
      } else {
        alert('Missing collection identifier!');
      }
    });
  }
}

// item definition
export type item = {
  id: number;
  name: string;
  link: string;
  description?: string;
};
