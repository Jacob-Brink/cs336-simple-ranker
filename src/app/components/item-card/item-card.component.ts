import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  NgModule,
} from '@angular/core';
import { FirestoreItem } from 'src/app/ranker-service.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  // declare input variables
  @Input() item: FirestoreItem; //

  // declare output variables
  // @Output('name')
  // nameResult: EventEmitter<any> = new EventEmitter();

  // @Output('information')
  // description: EventEmitter<any> = new EventEmitter();

  // @Output() image: EventEmitter<any> = new EventEmitter();

  // @Output() onDeletion: EventEmitter<void> = new EventEmitter();

  // use name for two way binding for updating title text to name
  // name: String = '';

  constructor() {}

  ngOnInit(): void {}

  // delete(): void {
  //   this.onDeletion.emit();
  // }
}
