import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { RankerServiceService } from 'src/app/ranker-service.service';

@Component({
    selector: 'app-collection-page',
    templateUrl: './collection-page.component.html',
    styleUrls: ['./collection-page.component.scss']
})
export class CollectionPageComponent implements OnInit {

    form = new FormGroup({
        question: new FormControl('Which is better?', [Validators.required]),
        itemList: new FormArray([]), 
    })

    constructor(private rankerService: RankerServiceService) {
	this.addItem();
    }

    ngOnInit(): void {
    }
    
    addItem(): void {

        const newGroup = new FormGroup({
            title: new FormControl('', [Validators.required, RxwebValidators.unique()]),
            description: new FormControl(),
            image: new FormControl(null, [Validators.required])
        });

        (this.form.get('itemList') as FormArray).push(newGroup);
    }

    get itemList(): FormArray {
        return this.form.get('itemList') as FormArray;
    }

    removeItem(event: number): void {
	this.itemList.removeAt(event);
    }

    onSubmit(): void {
        this.rankerService.uploadCollection({
            id: '00',
            question: this.form.get('question').value,
            data: this.form.get('itemList').value.map((item, index) => {
                return {
                    id: index,
                    name: item.title,
                    description: item.description || '',
                    image: item.image,
                }
            })
        })
        console.log(this.form.get('itemList').value);
    }

}

