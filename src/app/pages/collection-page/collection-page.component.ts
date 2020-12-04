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
	this.addItem();
    }

    ngOnInit(): void {
    }

    // custom validator function that checks if file type uploaded by user matches any of the given acceptable file types
    // inspired by: https://netbasal.com/how-to-implement-file-uploading-in-angular-reactive-forms-89a3fffa1a03
    // requiredFileTypes( types: Array<string> ): ValidatorFn {
    // 	return function ( control: FormControl ): (ValidationErrors | null) {
    // 	    const file = control.value;

    // 	    // if file doesn't exist, accept as valid
    // 	    if ( !file ) {
    // 		return null;
    // 	    }

    // 	    // check if given file's type matches list of file types allowed
    // 	    const fileExtension = file.name.split('.')[1].toLowerCase();

    // 	    if ( types.includes(fileExtension) ) {
    // 		return null;
    // 	    }

    // 	    // if invalid, send object detailing the invalid file type error
    // 	    return {
    // 		requiredFileType: true
    // 	    };			  
	    
    // 	}
    // }
    
    addItem(): void {
	this.items.push(new FormGroup({
	    title: new FormControl('', [Validators.required, RxwebValidators.unique()]),
	    description: new FormControl(),
	    image: new FormControl(null, [Validators.required])//, this.requiredFileTypes(['png', 'jpg'])]),
	}));
    }

    removeItem(index: number): void {
	console.log(index);
	this.items.removeAt(index);
    }
}
