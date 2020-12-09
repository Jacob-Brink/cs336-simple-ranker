import { Component, Input, OnInit } from '@angular/core';
import { item } from "../QuizPageComponent";

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {
  constructor() {
    type item = {
      id: number;
      name: string;
      link: string;
      description?: string;
    };
  }
  dog1: item = {
    id: 1,
    name: 'dog1',
    link: 'https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg'
  };
  dog2: item = {
    id: 2,
    name: 'dog2',
    link:
      'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d'
  };

  dog3: item = {
    id: 3,
    name: 'dog3',
    link:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*'
  };

  dog4: item = {
    id: 4,
    name: 'dog4',
    link:
      'https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp'
  };

  dog5: item = {
    id: 5,
    name: 'dog5',
    link: 'https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg'
  };

  item1: item;
  item2: item;

  currentMiddle: number = 0;
  lastMiddle: number = 0;
  data: item[] = [this.dog1, this.dog2, this.dog3, this.dog4, this.dog5];
  ranked: item[] = [];
  display: item[] = [];

  // This refreshes the whole ranked/data stuff
  ngOnInit(): void {
    // initialize the middles
    this.currentMiddle = 0;
    this.lastMiddle = 0;


    // initialize data 
    this.data = [this.dog1, this.dog2, this.dog3, this.dog4, this.dog5];
    
    //add current first item to ranked array
    this.ranked.push(this.data[0]);
    
    //add current first item to display array
    this.display.push(this.ranked[0]);
    
    // delete current first item
    this.data.shift();
    
    // add current second item to display
    this.display.push(this.data[0]);

    // might not need this
    this.item1 = this.ranked[this.currentMiddle];
    this.item2 = this.data[1];

  }

  reorder(item): void {

    // Slot 1 constantly changes
    // We keep asking till we can get slot 2 a spot in the ranked list

    // 1 Middle one vs next item in unranked list
    // •	If we pick Middle(item 1) -> the bottom half middle(25% queartile) becomes slot 1 (go to beginning and repeat)
    // •	If not found then we insert item 2 beneath the middle one
    // 2	If we pick Next item(item 2) -> the top half middle(25% quartile) becomes slot 1
    // go to beginning and repeat)
    // •	If not found then we insert item 2 above the middle one


    // Update and book keeping:

    // Unshift data

    // item 1 = new middle(round up)

    // item 2 = next item in data


    if(item == this.display[0]){
      console.log("item1 has been picked")

      // if there is nothing lower than the currentMiddle item, add it directly below the current middle item.
      if(this.currentMiddle === this.lastMiddle) {
        console.log("there is nothing");
        //add item 2 to right below the ranked item1
        this.ranked.splice(this.currentMiddle + 1, 0, this.data[0]);

        //update lastmiddle
        this.lastMiddle = 0;
        // update the currentmiddle
        this.currentMiddle = parseInt(this.ranked.length / 2);

        // update current display
        this.display.pop();
        this.data.shift();
        this.display.push(this.data[0]);
        


      }

      // there is something and now we need to find the new middle and item1 becomes that
      else {
        console.log("there is something");
        console.log(this.ranked.length);
        console.log(parseInt((this.currentMiddle + this.ranked.length)/2));

        //update last middle
        this.lastMiddle = this.currentMiddle;
        this.currentMiddle = parseInt((this.ranked.length + this.currentMiddle)/2);

        //replace item1 with the newmiddle item in the ranked array
        this.display.shift();
        this.display.splice(0, 0, this.ranked[this.currentMiddle]);


        

      }
    }
    else {
      console.log("item 2 has been picked")

    }
    console.log(this.lastMiddle);
    console.log(this.currentMiddle);

    console.log("this is the rank")
    console.log(this.ranked);
    console.log("this is the display");
    console.log(this.display);

  }

  
}




