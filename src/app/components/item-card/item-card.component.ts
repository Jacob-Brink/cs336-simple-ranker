import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  NgModule
} from '@angular/core';
import { FirestoreItem } from 'src/app/ranker-service.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  // declare input variables
  @Input() item: FirestoreItem; //

  constructor() {}

  ngOnInit(): void {}
}
