import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginCredentials } from 'src/app/shared/models/loginCredentials';
import { AuthService } from 'src/app/core/services/security/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from 'src/app/shared/config/app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../../../shared/styles/global.scss', './login.component.scss']
})
export class LoginComponent {
  @ViewChild('inputPassword', { static: false })
  private readonly passwordInput: ElementRef;
  loginForm: FormGroup;
  isRegistered = false;
  isPasswordVisible = false;
  createdInformation: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: ActivatedRoute,
    private readonly appConfig: AppConfig
  ) {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    if (this.router.snapshot.fragment === 'created') {
      this.displayToastMessage();
    }

    this.appConfig.getJSON().subscribe(response => {
      this.createdInformation = response.INFO.ACCOUNT_CREATED;
    });
  }

  loginAction(): void {
    this.authService.login({
      username: this.loginForm.get('login').value,
      password: this.loginForm.get('password').value
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

  private displayToastMessage(): void {
    const time = 4 * 1000;
    this.isRegistered = true;
    const that = this;
    setTimeout(() => {
      that.isRegistered = false;
    }, time);
  }
}
