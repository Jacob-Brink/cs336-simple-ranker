import { Component, OnInit, HostListener, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR,
	 NG_VALIDATORS,
	 ControlValueAccessor,
	 AbstractControl,
	 ValidationErrors,
	 Validator
       } from '@angular/forms';

//https://netbasal.com/how-to-implement-file-uploading-in-angular-reactive-forms-89a3fffa1a03
@Component({
    selector: 'app-image-input',
    templateUrl: './image-input.component.html',
    styleUrls: ['./image-input.component.scss'],
    providers: [
	{
	    provide: NG_VALUE_ACCESSOR,
	    useExisting: forwardRef(() => ImageInputComponent),
	    multi: true,
	},
	{
	    provide: NG_VALIDATORS,
	    useExisting: forwardRef(() => ImageInputComponent),
	    multi: true,
	}
    ],   
})
export class ImageInputComponent implements OnInit, Validator {

    file: File | null = null;
    onChange: Function;
    onValidatorChange: Function;
    constructor(private host: ElementRef<HTMLInputElement>) { }

    ngOnInit(): void {
    }

    // https://medium.com/@lukaonik/adding-custom-validation-to-the-custom-form-control-in-angular-f4e9b13b4728
    validate(control: AbstractControl): ValidationErrors {
	const isNotImageFile = this.file && !(['png', 'jpg'].includes(this.file.name.split('.')[1].toLowerCase()));
	console.log("asfd");
	return isNotImageFile ? { invalidFileType: true } : null;
    }

    registerOnValidatorChange?(fn: () => void): void {
	this.onValidatorChange = fn;
    }

    @HostListener('change', ['$event.target.files'])
    emitFiles( event: FileList ) {
	const file = event && event.item(0); // if event is true then and only then do we grab event.item(0)
	this.onChange(file);
	this.file = file;
    }

    // resets file input
    writeValue( value: null ): void {
	this.host.nativeElement.value = '';
	this.file = null;
    }

    registerOnChange( fn: Function ): void {
	this.onChange = fn;
    }

    registerOnTouched( fn: Function ): void {
    }
    
}
