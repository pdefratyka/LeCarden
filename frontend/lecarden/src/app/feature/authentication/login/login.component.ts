import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginCredentials } from 'src/app/shared/models/loginCredentials';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from 'src/app/shared/config/app-config';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Authenticate } from '../store/actions/login.action';
import { Subscription, Observable } from 'rxjs';
import { getLoginState, LoginState } from '../store';

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
  getState: Observable<any>;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly appConfig: AppConfig,
    private store: Store<LoginState>
  ) {
    this.getState = this.store.select(getLoginState);
  }

  ngOnDestroy(): void {
    this.$loginSubscribtion.unsubscribe();
  }

  ngOnInit(): void {
    this.displayToastMessageIfCreatedAccount();
    this.$loginSubscribtion = this.getState.subscribe((state) => {
      if (state.authenticate.errorMessage) {
        this.loadGif = false;
        this.invalidCredentials = true;
      }
    });
  }

  loginAction(loginCredentials: LoginCredentials): void {
    this.loadGif = true;
    this.invalidCredentials = false;
    const payload = {
      userName: loginCredentials.username,
      password: loginCredentials.password,
    };
    this.store.dispatch(new Authenticate(payload));
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
