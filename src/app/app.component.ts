import { Component } from '@angular/core';

interface Item {
  image: String;
  name: String;
  description?: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SimpleRanker';
  items: Array<Item> = [];
}
