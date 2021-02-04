import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      required: 'Dit veld is verplicht',
      email: 'Dit is geen geldig email adres',
      minlength: `Minimum lengte: ${validatorValue.requiredLength}`,
      min: `Dit veld mag niet negatief zijn`,
      pattern: 'Dit geen geldig email adres',
      noNumber: 'Dit moet een nummer zijn!',
    };

    return config[validatorName];
  }

  static noNumber(control) {
    if (control.value.match(/[0-9]+/)) {
      return null;
    } else {
      return { noNumber: true };
    }
  }
}
