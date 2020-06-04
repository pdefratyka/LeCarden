import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginCredentials } from 'src/app/shared/models/loginCredentials';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './../../styles/authentication.scss',
    './login-form.component.scss',
  ],
})
export class LoginFormComponent implements OnChanges {
  @ViewChild('passwordInput')
  private readonly passwordInput: ElementRef;
  @Output() loginEvent: EventEmitter<LoginCredentials> = new EventEmitter<
    LoginCredentials
  >();
  @Input() invalidCredentials: boolean;
  isPasswordVisible = false;
  loginForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.initLoginForm();
  }

  ngOnChanges(): void {
    if (this.invalidCredentials) {
      this.initLoginForm();
    }
  }
  
  login(): void {
    this.loginEvent.emit({
      username: this.loginForm.get('login').value,
      password: this.loginForm.get('password').value,
    } as LoginCredentials);
  }

  changePasswordVisibility(): void {
    if (this.passwordInput.nativeElement.getAttribute('type') === 'password') {
      this.passwordInput.nativeElement.setAttribute('type', 'text');
      this.isPasswordVisible = true;
    } else {
      this.passwordInput.nativeElement.setAttribute('type', 'password');
      this.isPasswordVisible = false;
    }
  }

  private initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
