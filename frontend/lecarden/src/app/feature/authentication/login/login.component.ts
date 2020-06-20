import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginCredentials } from 'src/app/shared/models/loginCredentials';
import { AuthService } from 'src/app/core/services/security/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from 'src/app/shared/config/app-config';
import { take, finalize } from 'rxjs/operators';
import { TokenService } from 'src/app/core/services/security/token.service';
import { ToastService } from 'src/app/core/services/common/toast.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { Authenticate } from '../store/actions/login.action';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../styles/authentication.scss', './login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  createdInformation = '';
  invalidCredentials = false;
  loadGif = false;
  $loginSubscribtion = new Subscription();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly appConfig: AppConfig,
    private readonly tokenService: TokenService,
    private readonly toastService: ToastService,
    private store: Store<fromStore.LoginState>
  ) {}

  ngOnDestroy(): void {
    this.$loginSubscribtion.unsubscribe();
  }

  ngOnInit(): void {
    this.displayToastMessageIfCreatedAccount();
  }

  loginAction(loginCredentials: LoginCredentials): void {
    const payload = {
      userName: loginCredentials.username,
      password: loginCredentials.password,
    };
    this.store.dispatch(new Authenticate(payload));
    this.$loginSubscribtion = this.store
      .select(fromStore.getAuthenticateState)
      .subscribe((state) => {
        console.log(state.loading);
        console.log(state.loaded);
        if (state.loading) {
          console.log('1');
          this.loadGif = true;
          this.invalidCredentials = false;
        } else if (!state.loading && state.loaded) {
          console.log('2');
          this.toastService.success(`Hallo ${this.tokenService.getUserName()}`);
          this.loadGif = false;
        } else if (!state.loading && !state.loaded) {
          console.log('3');
          this.invalidCredentials = true;
          this.loadGif = false;
        }
      });
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
  private displayToastMessageIfCreatedAccount(): void {
    if (this.activatedRoute.snapshot.fragment === 'created') {
      this.displayToastMessage();
    }
  }
}
