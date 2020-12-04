import { Component, EventEmitter, OnInit, Output, NgModule, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormGroup, ControlContainer } from '@angular/forms';

/* CollectionCreateCardComponent is given a FormGroup and allows the user to fill it.
 * - Getting the FormGroup to be passed down: https://stackoverflow.com/questions/38547389/how-can-i-pass-the-formgroup-of-a-parent-component-to-its-child-component-using
 * 
 */

@Component({
  selector: 'app-collection-create-card',
  templateUrl: './collection-create-card.component.html',
  styleUrls: ['./collection-create-card.component.scss']
})
export class CollectionCreateCardComponent implements OnInit {
    public form: FormGroup;


    @Input("index")
    id: number;
    
  // declare output variables
  @Output("name")
  nameResult: EventEmitter<any> = new EventEmitter();

  @Output("information")
  description: EventEmitter<any> = new EventEmitter();
  
  @Output() image: EventEmitter<any> = new EventEmitter();

  @Output() onDelete: EventEmitter<number> = new EventEmitter();

  // use name for two way binding for updating title text to name
  name: String = "";
  imageFile: String = null;

    constructor(private sanitizer:DomSanitizer, private controlContainer: ControlContainer) { }

  ngOnInit(): void {
      this.form = <FormGroup>this.controlContainer.control;
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
	this.onDelete.emit(this.id);
    }

}
