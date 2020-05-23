import { Component, OnInit } from '@angular/core';
import { LoginCredentials } from 'src/app/shared/models/loginCredentials';
import { AuthService } from 'src/app/core/services/security/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from 'src/app/shared/config/app-config';
import { take, finalize } from 'rxjs/operators';
import { TokenService } from 'src/app/core/services/security/token.service';
import { ToastService } from 'src/app/core/services/common/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../styles/authentication.scss', './login.component.scss'],
})
export class LoginComponent implements OnInit {
  createdInformation = '';
  invalidCredentials = false;
  loadGif = false;

  constructor(
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly appConfig: AppConfig,
    private readonly router: Router,
    private readonly tokenService: TokenService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.displayToastMessageIfCreatedAccount();
  }

  loginAction(loginCredentials: LoginCredentials): void {
    this.invalidCredentials = false;
    this.loadGif = true;
    this.authService
      .login(loginCredentials)
      .pipe(
        take(1),
        finalize(() => {
          this.loadGif = false;
        })
      )
      .subscribe(
        (response) => this.handleSuccessfulLogin(response),
        () => {
          this.toastService.error('Wrong credentials');
          this.invalidCredentials = true;
        }
      );
  }

  private displayToastMessage(): void {
    const time = 4 * 1000;
    this.appConfig
      .getJSON()
      .pipe(take(1))
      .subscribe((response) => {
        this.createdInformation = response.INFO.ACCOUNT_CREATED;
      });
    this.resetIsRegisteredWithDelay(time);
  }

  private resetIsRegisteredWithDelay(time: number): void {
    const that = this;
    setTimeout(() => {
      that.createdInformation = '';
    }, time);
  }

  private handleSuccessfulLogin(response: string): void {
    const jwt = 'jwt';
    this.tokenService.setToken(response[jwt]);
    this.toastService.success(`Hallo ${this.tokenService.getUserName()}`);
    this.router.navigate(['add-word']);
  }

  private displayToastMessageIfCreatedAccount(): void {
    if (this.activatedRoute.snapshot.fragment === 'created') {
      this.displayToastMessage();
    }
  }
}
