import { Component, EventEmitter, OnInit, Output, NgModule, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormGroup, ControlContainer } from '@angular/forms';
import { RankerServiceService } from 'src/app/ranker-service.service';

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

    @Output() onDelete: EventEmitter<number> = new EventEmitter();

    // use name for two way binding for updating title text to name
    name: String = "";
    imageFile: String = null;
    
    constructor(private sanitizer:DomSanitizer, private controlContainer: ControlContainer, private rankerService: RankerServiceService) { }

    ngOnInit(): void {
	    this.form = <FormGroup>this.controlContainer.control;
    }
    
    delete(): void {
	this.onDelete.emit(this.id);
    }

}
