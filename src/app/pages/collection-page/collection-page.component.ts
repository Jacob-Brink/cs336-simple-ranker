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

    form: FormGroup;

    constructor(private rankerService: RankerServiceService) {
        this.form = new FormGroup({
            question: new FormControl('Which is better?', [Validators.required]),
            items: new FormArray([]),
        })
        this.addItem();
    }

    ngOnInit(): void {
    }

    get items() {
        return this.form.get('items') as FormArray;
    }

    get question() {
        return this.form.get('question') as FormControl;
    }

    addItem(): void {
        this.items.push(
            new FormGroup(
                {
                    title: new FormControl('', [Validators.required, RxwebValidators.unique()]),
                    description: new FormControl(),
                    image: new FormControl(null, [Validators.required])
                }
        ));
    }

    removeItem(event: number): void {
        this.items.removeAt(event);
    }

    onSubmit(): void {
        this.rankerService.uploadCollection({
            id: '00',
            question: this.question.value,
            data: this.items.value.map((item, index) => {
                return {
                    id: index,
                    name: item.title,
                    description: item.description || '',
                    image: item.image,
                }
            })
        })
        console.log(this.items.value);
    }
}
