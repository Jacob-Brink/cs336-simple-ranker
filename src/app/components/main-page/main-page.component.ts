import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { RankerServiceService } from 'src/app/ranker-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private rankerService: RankerServiceService) {}

  ngOnInit(): void {}

  sortMethod: FormControl = new FormControl('');

  label1 = 'CREATE';
  label2 = 'quiz';
  label3 = 'final page';

  functioncall(event) {
    console.log('functioncall', event);
  }

  pageChanged(e: Event) {
    console.log(e);
  }

  changeSortingMethod(e: Event){
    console.log(e);
  }
}
