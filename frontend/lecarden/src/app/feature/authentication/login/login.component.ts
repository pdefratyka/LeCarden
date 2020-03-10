import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginCredentials } from 'src/app/shared/models/loginCredentials';
import { AuthService } from 'src/app/core/services/security/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../../../shared/styles/global.scss', './login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isRegistered = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    if (this.router.snapshot.fragment === 'created') {
      this.displayToastMessage();
    }
  }

  private displayToastMessage(): void {
    this.isRegistered = true;
    const that = this;
    setTimeout(() => {
      that.isRegistered = false;
    }, 4 * 1000);
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginAction(): void {
    /*this.authService.login({
      username: this.login.value,
      password: this.password.value
    } as LoginCredentials);*/
  }
}
