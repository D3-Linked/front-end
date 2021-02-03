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
      pattern: 'Dit geen geldig email adres'
    };

    return config[validatorName];
  }
}
