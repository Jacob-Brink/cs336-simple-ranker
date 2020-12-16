import { Component, OnInit } from '@angular/core';
import {
  FirestoreCollection,
  RankerServiceService
} from 'src/app/ranker-service.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final-page',
  templateUrl: './final-page.component.html',
  styleUrls: ['./final-page.component.scss']
})
export class FinalPageComponent implements OnInit {
  data: FirestoreCollection = null;

  /** FinalPageComponent constructor
   * get Ranking, then get Collection and display on page
   * @param rankerService
   */
  constructor(
    private rankerService: RankerServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private clipboard: Clipboard
  ) {}

  loadData(rankID: string): void {
    this.rankerService.getRanking(rankID).subscribe(rankerData => {
      this.rankerService
        .getCollection(rankerData.collectionID)
        .subscribe(collectionData => {
          this.data = {
            id: rankerData.collectionID,
            question: collectionData.question,
            data: rankerData.data.map(itemID => {
              return collectionData.data.filter(collectionItem => {
                return collectionItem.id === itemID;
              })[0];
            }),
            timeStamp: collectionData.timeStamp,
            rankings: collectionData.rankings,
            averageRanking: collectionData.averageRanking
          };
          console.log(this.data);
        });
    });
  }

  // function that copies the code for the unranked collection to clipboard
  shareCollection() {
    this.clipboard.writeText(this.data.id);
  }

  // function that copise the code for the current ranked collection to clipboard
  shareRanked() {
    this.clipboard.writeText(this.router.url);
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const rankID = params['rankid'];
      if (rankID !== undefined) {
        this.loadData(rankID);
      } else {
        alert('Please specify a rankID');
      }
    });
  }
}
