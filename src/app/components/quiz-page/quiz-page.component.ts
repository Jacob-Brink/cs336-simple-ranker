import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreItem, RankerServiceService } from 'src/app/ranker-service.service';
import { ItemCardComponent } from '../item-card/item-card.component';
// import { item } from "../QuizPageComponent";

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private rankerService: RankerServiceService, private router: Router) { }

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


  getNewPivot(): item {
    return this.ranked[Math.floor((this.high-this.low)/2)+this.low];
  }

  updateDisplay(): void {
    this.display = [this.pivot, this.insertedItem];
  }

  reorder(thing: item) {

    if (this.completed) {
      return;
    }

    if (this.pivot) {
      const pivotIndex = this.ranked.findIndex(rankedItem => { return rankedItem.id === this.pivot.id});

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
        this.rankerService.uploadRanking({
          id: 'not needed',
          collectionID: this.collectionID,
          data: this.ranked.map(item => {
            return item.id;
          }),
          timeStamp: Date.now()
        }).then(rankID => {
          this.router.navigateByUrl('/final?rankid=' + rankID);
        });
        this.completed = true;
        return;
      }
      

    } 

    this.pivot = this.getNewPivot();
    this.updateDisplay();

  }

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
            description: firestoreItem.description,
          }
        });


        this.insertedItem = this.data.pop();

        this.reorder(this.insertedItem);

      }
    })
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




    // initialize data
    //this.data = [this.dog1, this.dog2, this.dog3, this.dog4, this.dog5];



    // might not need this
    // this.item1 = this.ranked[this.currentMiddle];
    // this.item2 = this.data[1];
  }

  // reorder(item): void {
  //   // Slot 1 constantly changes
  //   // We keep asking till we can get slot 2 a spot in the ranked list

  //   // 1 Middle one vs next item in unranked list
  //   // •	If we pick Middle(item 1) -> the bottom half middle(25% queartile) becomes slot 1 (go to beginning and repeat)
  //   // •	If not found then we insert item 2 beneath the middle one
  //   // 2	If we pick Next item(item 2) -> the top half middle(25% quartile) becomes slot 1
  //   // go to beginning and repeat)
  //   // •	If not found then we insert item 2 above the middle one

  //   // Update and book keeping:

  //   // Unshift data

  //   // item 1 = new middle(round up)

  //   // item 2 = next item in data

  //   if (item == this.display[0]) {
  //     console.log('item1 has been picked');

  //     // if low and high are right next to each other, add it directly below the current high item.
  //     if (this.high <= this.low) {
  //       console.log('there is nothing');
  //       //add item 2 to right below the ranked item1
  //       this.ranked.splice(this.high + 1, 0, this.data[this.data.length - 1]);

  //       //update low
  //       this.low = 0;
  //       // update the high
  //       this.high = this.ranked.length - 1;

  //       // update current display
  //       this.display.pop();
  //       ///////
  //       this.display.pop();

  //       this.display.push(
  //         this.ranked[parseInt(((this.low + this.high) / 2).toString())]
  //       );
  //       ///////////
  //       this.data.pop();
  //       this.display.push(this.data[this.data.length - 1]);
  //     }

  //     // there is something and now we need to find the new middle and item1 becomes that
  //     else {
  //       console.log('there is something');
  //       console.log(this.ranked.length);
  //       // console.log(parseInt((this.currentMiddle + this.ranked.length)/2));

  //       //update low(higher ranked item)
  //       this.low = this.ranked.indexOf(this.display[0]) + 1;

  //       //replace item1 with the newmiddle item in the ranked array
  //       this.display.shift();
  //       this.display.splice(
  //         0,
  //         0,
  //         this.ranked[
  //         parseInt(Math.floor((this.low + this.high) / 2).toString())
  //         ]
  //       );
  //     }
  //   } else {
  //     // if there is nothing higher than the currentMiddle item, add it directly above the current middle item.
  //     if (this.high <= this.low + 1) {
  //       console.log('there is nothing');
  //       //add item 2 to right above the ranked item1
  //       this.ranked.splice(this.low, 0, this.data[this.data.length - 1]);

  //       //reset low
  //       this.low = 0;
  //       // reset the high
  //       this.high = this.ranked.length - 1;

  //       // update current display
  //       this.display.pop();
  //       this.display.pop();

  //       this.display.push(
  //         this.ranked[parseInt(((this.low + this.high) / 2).toString())]
  //       );

  //       this.data.pop();
  //       this.display.push(this.data[this.data.length - 1]);
  //     } else {
  //       console.log('there is something');
  //       console.log(this.ranked.length);
  //       // console.log(parseInt((this.currentMiddle + this.ranked.length)/2));

  //       //update high(lower ranked item)
  //       this.high = this.ranked.indexOf(this.display[0]);

  //       //replace item1 with the newmiddle item in the ranked array
  //       this.display.shift();
  //       this.display.splice(
  //         0,
  //         0,
  //         this.ranked[
  //         parseInt(Math.floor((this.low + this.high) / 2).toString())
  //         ]
  //       );
  //     }
  //     console.log('item 2 has been picked');
  //   }
  //   console.log(this.low);
  //   console.log(this.high);

  //   console.log('this is the rank');
  //   console.log(this.ranked);
  //   console.log('this is the display');
  //   console.log(this.display);

  //   console.log(this.data);
  // }
}

export type item = {
  id: number;
  name: string;
  link: string;
  description?: string;
};
