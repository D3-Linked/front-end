import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './validation.service';

@Component({
  selector: 'control-messages',
  template: `
    <div *ngIf="errorMessage !== null">{{errorMessage}}</div>
  `
})
export class ControlMessages {
  //Krijgt een formControl element binnen dat hij moet controlleren
  @Input() control: FormControl;
  constructor() {}

  //controlleerd welke validate er op deze control is ingesteld en haalt via de validationService de juiste message op
  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
