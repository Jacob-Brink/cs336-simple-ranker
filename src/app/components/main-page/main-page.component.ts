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
  
  sortMethod: string = 'timestamp';
  limit: number = 5;
  direction: 'asc' | 'desc' = 'asc';
  
  label1: string = "CREATE";
  lastValue: any;
  firstValue: any;
  
  constructor(private rankerService: RankerServiceService) {}

  ngOnInit(): void {
    const stuff = this.rankerService.getPage({
      collectionName: 'EasyRankingCollection',
      sortMethod: this.sortMethod,
      limit: this.limit,
      direction: this.direction
    }).subscribe(data => {
      console.log("AAAAAAAAAAAAAAAAAAAAAA");
      console.log(data);
    });

    console.log(stuff);

  }

  functioncall(event) {
    console.log('functioncall', event);
  }

  pageChanged(e: Event) {
    this.rankerService.getNextPage({
      collectionName: '/EasyRankingCollection',
      sortMethod: this.sortMethod,
      limit: this.limit,
      direction: this.direction,
    },
      this.lastValue
    ).onSnapshot(value => {
      console.log(value);
    });
    console.log(e);
  }

  changeSortingMethod(e: Event){
    console.log(e);
  }
}
