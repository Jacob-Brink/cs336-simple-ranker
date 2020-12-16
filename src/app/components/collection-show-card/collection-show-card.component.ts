import { Component, Input, OnInit } from '@angular/core';
import { FirestoreCollection } from 'src/app/ranker-service.service';

@Component({
  selector: 'app-collection-show-card',
  templateUrl: './collection-show-card.component.html',
  styleUrls: ['./collection-show-card.component.scss']
})
export class CollectionShowCardComponent implements OnInit {

  @Input()
  question: string = 'Who is better?';

  image: string = null;

  @Input()
  rankings: number = 0;

  @Input()
  collectionID: string = '';

  @Input()
  item: FirestoreCollection;

  constructor() { }

  ngOnInit(): void {
    this.question = this.item.question;
    this.rankings = this.item.rankings;
    this.collectionID = this.item.id;
    this.image = this.item.data[0].imageDownloadURL;
  }

}
