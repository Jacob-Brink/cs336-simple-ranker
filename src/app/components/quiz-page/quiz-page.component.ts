import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {
  constructor() {}

  data: Dog[] = [];
  dog1: Dog = {
    name: 'dog1',
    link: 'https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg'
  };
  dog2: Dog = {
    name: 'dog2',
    link:
      'https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d'
  };

  dog3: Dog = {
    name: 'dog3',
    link:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*'
  };

  dog4: Dog = {
    name: 'dog4',
    link:
      'https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp'
  };

  dog5: Dog = {
    name: 'dog5',
    link: 'https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg'
  };

  ngOnInit(): void {}
}

type Dog = {
  name: string;
  link: string;
};
