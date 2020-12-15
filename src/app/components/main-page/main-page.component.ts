import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  label1 = 'CREATE';
  label2 = 'quiz';
  label3 = 'final page';

  functioncall(event) {
    console.log('functioncall', event);
  }
}
