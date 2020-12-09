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

  data: item[] = [this.dog1, this.dog2, this.dog3, this.dog4, this.dog5];
  ranked: item[] = [];
  display: item[] = [];

  ngOnInit(): void {
    this.ranked.push(this.data[0]);
    this.item1 = this.data[0];
    this.item2 = this.data[1];
    this.display.push(this.item1);
    this.display.push(this.item2);

  }

  reorder(item): void {

    // Slot 1 constantly changes
    // We keep asking till we can get slot 2 a spot in the ranked list

    // 1 Middle one vs next item in unranked list
    // •	If we pick Middle(slot 1) -> the bottom half middle(25% queartile) becomes slot 1 (go to beginning and repeat)
    // •	If not found then we insert slot 2 beneath the middle one
    // 2	If we pick Next item(slot2) -> the top half middle(25% quartile) becomes slot 1
    // go to beginning and repeat)
    // •	If not found then we insert slot 2 above the middle one


    // Update and book keeping:

    // Unshift data

    // Slot 1 = new middle(round up)

    // Slot 2 = next item in data


  if(item == this.display[0]){
    console.log("item1 has been picked")
    console.log(item);
    
  }
  else {
    console.log("item 2 has been picked")
    console.log(item);

  }

    console.log("reorder has been called")
  }

  
}




