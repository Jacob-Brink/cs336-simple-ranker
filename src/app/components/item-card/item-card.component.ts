import { Component, EventEmitter, OnInit, Output, NgModule } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  // declare output variables
  @Output("name")
  nameResult: EventEmitter<any> = new EventEmitter();

  @Output("information")
  description: EventEmitter<any> = new EventEmitter();
  
  @Output() image: EventEmitter<any> = new EventEmitter();

  @Output() onDeletion: EventEmitter<void> = new EventEmitter();

  // use name for two way binding for updating title text to name
  name: String = "";
  imageFile: String = null;

  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit(): void {

  }

  // get user pasting image
  onPaste(e: any ) {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        let blob = item.getAsFile();

        // Convert Blob to Image URL and avoid errors about safety
        // https://stackoverflow.com/questions/51019467/convert-blob-to-image-url-and-use-in-image-src-to-display-image/51019799
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          this.imageFile = reader.result as String;
        }
        
      }
    }
  }

  delete(): void {
    this.onDeletion.emit();
  }

}
