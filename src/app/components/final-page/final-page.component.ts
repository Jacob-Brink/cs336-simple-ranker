import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-final-page',
  templateUrl: './final-page.component.html',
  styleUrls: ['./final-page.component.scss'],
})
export class FinalPageComponent implements OnInit {
  constructor() {}

  dog1: item = {
    id: 1,
    name: 'dog1',
    link: 'https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg',
  };
  dog2: item = {
    id: 2,
    name: 'dog2',
    link:
      'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d',
  };

  dog3: item = {
    id: 3,
    name: 'dog3',
    link:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*',
  };

  dog4: item = {
    id: 4,
    name: 'dog4',
    link:
      'https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp',
  };

  dog5: item = {
    id: 5,
    name: 'dog5',
    link: 'https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg',
  };

  dog6: item = {
    id: 6,
    name: 'dog6',
    link:
      'https://dogcatselfie.com/content/uploads/images/April2017/Animaux-et-emotions-19.jpg',
  };

  dog7: item = {
    id: 7,
    name: 'dog7',
    link:
      'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg',
  };
  item1: item;
  item2: item;

  // low: number = 0;
  // high: number = 0;
  data: item[] = [];
  // ranked: item[] = [];
  display: item[] = [];

  ngOnInit(): void {
    // initialize data
    this.data = [this.dog1, this.dog2, this.dog3, this.dog4, this.dog5];

    //add current first item to ranked array
    // this.ranked.push(this.data[0]);

    // initialize the ranges
    // this.low = 0; // low is the highest ranked item
    // this.high = 0; //high is the lowest ranked item

    //add current first item to display array
    // this.display.push(this.ranked[0]);

    // delete current first item
    // this.data.shift();

    // add current second item to display
    // this.display.push(this.data[0]);

    // might not need this
    // this.item1 = this.ranked[this.currentMiddle];
    // this.item2 = this.data[1];
  }
}

export type item = {
  id: number;
  name: string;
  link: string;
  description?: string;
};
