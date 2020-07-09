import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/core/services/security/auth.service';
import {
  loginActions,
  Authenticate,
  AuthenticateSuccess,
  AuthenticateFail,
} from '../actions/login.action';
import {
  switchMap,
  withLatestFrom,
  map,
  catchError,
  tap,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LoginCredentials } from 'src/app/shared/models/loginCredentials';
import { LoginHandlerService } from 'src/app/core/services/common/login-handler.service';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private readonly loginHandlerService: LoginHandlerService
  ) {}

  /*@Effect()
  login$ = this.actions$.pipe(ofType(loginActions.AUTHENTICATE)).pipe(
      withLatestFrom(this.store)
    switchMap(() => {
      return this.authService.login().pipe(
        map((words) => new wordActions.LoadWordsSuccess(words)),
        catchError((error) => of(new wordActions.LoadWordsFail(error)))
      );
    })
  );*/

  /*@Effect()
  login$ = this.actions$
    .pipe(
      ofType(loginActions.AUTHENTICATE),
      map((action: Authenticate) => {
        console.log('Yolo');
        return action.payload;
      })
    )
    .pipe(
      switchMap((payload) => {
        console.log('swith');
        console.log(payload);
        return 'w';
        /*return this.wordService.getAllWords().pipe(
        map((words) => new wordActions.LoadWordsSuccess(words)),
        catchError((error) => of(new wordActions.LoadWordsFail(error)))
      );
      })
    );*/
  @Effect()
  login$: Observable<any> = this.actions$
    .pipe(ofType(loginActions.AUTHENTICATE))
    .pipe(
      map((action: Authenticate) => action.payload),
      switchMap((payload) => {
        return this.authService
          .login({
            username: payload.userName,
            password: payload.password,
          } as LoginCredentials)
          .pipe(
            map((response) => {
              return new AuthenticateSuccess(response);
            }),
            catchError((error) => of(new AuthenticateFail(error.message)))
          );
      })
    );

  @Effect({ dispatch: false })
  loginSuccess$: Observable<any> = this.actions$.pipe(
    ofType(loginActions.AUTHENTICATE_SUCCESS),
    tap((response) => {
      this.loginHandlerService.handleSuccessfulLogin(response.payload);
    })
  );

  @Effect({ dispatch: false })
  loginFailure$: Observable<any> = this.actions$.pipe(
    ofType(loginActions.AUTHENTICATE_FAIL)
  );
}
