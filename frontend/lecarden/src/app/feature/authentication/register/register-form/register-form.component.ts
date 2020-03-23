import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { CustomValidatorService } from 'src/app/core/services/validators/custom-validator-service.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './../../styles/authentication.scss',
    './register-form.component.scss'
  ]
})
export class RegisterFormComponent {
  @Output()
  registerUser: EventEmitter<User> = new EventEmitter<User>();
  registerForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.initRegisterForm();
  }

  private initRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
    this.updateConfirmPasswordValidator();
  }

  updateConfirmPasswordValidator(): void {
    this.registerForm
      .get('confirmPassword')
      .setValidators([
        Validators.required,
        CustomValidatorService.acceptedValue(
          this.registerForm.get('password').value
        )
      ]);
    this.registerForm
      .get('confirmPassword')
      .setValue(this.registerForm.get('confirmPassword').value);
  }

  emitRegisterUser(): void {
    this.registerUser.emit(this.getUserFromForm());
  }

  private getUserFromForm(): User {
    return {
      login: this.registerForm.get('login').value,
      password: this.registerForm.get('password').value,
      email: this.registerForm.get('email').value
    } as User;
  }
}
