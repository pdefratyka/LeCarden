import { Injectable } from '@angular/core';
import {
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService implements Validators {
  static acceptedValue(value: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return value !== control.value
        ? { forbidden: 'You cant use this value' }
        : null;
    };
  }
}
