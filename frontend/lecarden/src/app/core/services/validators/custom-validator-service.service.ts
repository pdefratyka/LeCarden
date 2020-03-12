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
  static forbiddenValidator(
    forbidden: string[],
    exception: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return forbidden.find(x => x !== exception && x === control.value)
        ? { forbidden: 'You cant use this value' }
        : null;
    };
  }
}
