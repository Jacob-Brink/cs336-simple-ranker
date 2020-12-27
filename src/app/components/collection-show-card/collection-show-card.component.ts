import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FirestoreCollection, FirestoreItem } from 'src/app/ranker-service.service';

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

  highestRankedItem: FirestoreItem;
  lowestRankedItem: FirestoreItem;

  @Output()
  onPressed: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  

  ngOnInit(): void {
    this.question = this.item.question;
    this.rankings = this.item.rankings;
    this.collectionID = this.item.id;
    this.highestRankedItem = this.item.data[this.item.averageRanking.sort((a, b) => { return a.averagePosition - b.averagePosition; })[this.item.data.length-1].id];
    this.lowestRankedItem = this.item.data[this.item.averageRanking.sort((a, b) => { return b.averagePosition - a.averagePosition; })[this.item.data.length-1].id];
    this.image = this.highestRankedItem.imageDownloadURL;
  }

  @HostListener('click', ['$event'])
  onClick(e) {
    this.onPressed.emit(this.item.id);
  }

}
