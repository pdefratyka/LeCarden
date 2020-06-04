import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidatorService } from 'src/app/core/services/validators/custom-validator-service.service';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './../../styles/authentication.scss',
    './change-password-form.component.scss',
  ],
})
export class ChangePasswordFormComponent {
  @Output() changePassword: EventEmitter<string> = new EventEmitter<string>();
  passwordForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.initPasswordForm();
  }

  emitChangePassword(): void {
    this.changePassword.emit(this.passwordForm.get('password').value);
  }

  private initPasswordForm(): void {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
    this.updateConfirmPasswordValidator();
  }

  updateConfirmPasswordValidator(): void {
    this.passwordForm
      .get('confirmPassword')
      .setValidators([
        Validators.required,
        CustomValidatorService.acceptedValue(
          this.passwordForm.get('password').value
        ),
      ]);
    this.passwordForm
      .get('confirmPassword')
      .setValue(this.passwordForm.get('confirmPassword').value);
  }
}
