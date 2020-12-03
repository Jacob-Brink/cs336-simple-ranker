import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// assumed name is unique
interface Item {
  name: String;
  description?: String;
  imageURL: String;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  choice: String = null;

  @Input() choices: Item[];

  @Output() result: EventEmitter<String> = new EventEmitter<String>();
  @Output() back: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  // when the users click next, submit choice to parent
  // assumed next cannot be selected until choice has been chosen
  onNext(choice: String): void {
    this.result.emit(choice);
  }

  // when the user goes back, inform the parent
  goBack(): void {
    this.back.emit();
  }

}
