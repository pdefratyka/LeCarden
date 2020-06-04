import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './../../styles/authentication.scss',
    './forgot-password-form.component.scss',
  ],
})
export class ForgotPasswordFormComponent {
  @Output() sendPasswordReset: EventEmitter<string> = new EventEmitter<
    string
  >();
  forgotPasswordForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.initForgotPasswordForm();
  }

  emitEmailAddress(): void {
    this.sendPasswordReset.emit(this.forgotPasswordForm.get('email').value);
  }

  private initForgotPasswordForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
