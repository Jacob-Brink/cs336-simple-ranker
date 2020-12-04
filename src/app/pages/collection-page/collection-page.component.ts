import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-collection-page',
    templateUrl: './collection-page.component.html',
    styleUrls: ['./collection-page.component.scss']
})
export class CollectionPageComponent implements OnInit {
    items = new FormArray([]);

    constructor() {
	this.addItem();
    }

    ngOnInit(): void {
    }
    
    addItem(): void {
	this.items.push(new FormGroup({
	    title: new FormControl('', [Validators.required, RxwebValidators.unique()]),
	    description: new FormControl(),
	    image: new FormControl(null, [Validators.required])
	}));
    }

    removeItem(event: number): void {
	this.items.removeAt(event);
    }
}
