import { Component } from '@angular/core';
import { RankerServiceService } from './ranker-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SimpleRanker';
  constructor(private rankerService: RankerServiceService) {
    rankerService.getRanking('fffff');
  }
}
