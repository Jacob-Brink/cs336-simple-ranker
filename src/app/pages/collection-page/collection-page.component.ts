import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-collection-page',
    templateUrl: './collection-page.component.html',
    styleUrls: ['./collection-page.component.scss']
})
export class CollectionPageComponent implements OnInit {
    items = new FormArray([]);

    
    constructor() {
	this.addItem();
	this.addItem();
    }

    ngOnInit(): void {
    }

    addItem(): void {
	this.items.push(new FormGroup({
	    title: new FormControl('Gandalf the Gray', Validators.required),
	    description: new FormControl(),
	    image: new FormControl(null, Validators.required),
	}));
    }
}
