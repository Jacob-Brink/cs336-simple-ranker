import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-select-card',
  templateUrl: './image-select-card.component.html',
  styleUrls: ['./image-select-card.component.scss']
})
export class ImageSelectCardComponent implements OnInit {

  @Input() name: String = "";
  @Input() imageURL: String = "";
  @Input() description: String = "";

  constructor() { }

  ngOnInit(): void {
  }

}
