import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginCredentials } from 'src/app/shared/models/loginCredentials';
import { AuthService } from 'src/app/core/services/security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../../../shared/styles/global.scss', './login.component.scss']
})
export class LoginComponent {
  @ViewChild('inputPassword', { static: false })
  private readonly passwordInput: ElementRef;
  loginForm: FormGroup;
  isPasswordVisible = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginAction(): void {
    this.authService.login({
      username: this.login.value,
      password: this.password.value
    } as LoginCredentials);
  }

  changePasswordVisibility(): void {
    console.log('1');
    if (this.passwordInput.nativeElement.getAttribute('type') === 'password') {
      this.passwordInput.nativeElement.setAttribute('type', 'text');
      console.log('2');
      this.isPasswordVisible = true;
    } else {
      console.log('3');
      this.passwordInput.nativeElement.setAttribute('type', 'password');
      this.isPasswordVisible = false;
    }
  }
}
