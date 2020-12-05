import { Component, OnInit } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-image-input-preview',
  templateUrl: './image-input-preview.component.html',
  styleUrls: ['./image-input-preview.component.scss']
})
export class ImageInputPreviewComponent implements OnInit {

    public form: FormGroup;
    imageFile: any = null;
    
    constructor(private controlContainer: ControlContainer) { }

    ngOnInit(): void {
	this.form = <FormGroup>this.controlContainer.control;
	this.onChanges();
    }

    onChanges(): void {
	this.form.get('image').valueChanges.subscribe(val => {
	    if (this.form.get('image').status === 'VALID') {
		var fr = new FileReader();
		fr.onload = () => {
	     	    this.imageFile = fr.result;
		}
		fr.readAsDataURL(val);
	    }
	});
    }
}
