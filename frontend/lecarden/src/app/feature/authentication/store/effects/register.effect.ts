import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/core/services/api/user.service';
import { Observable, of } from 'rxjs';
import {
  registerActions,
  Register,
  RegisterSuccess,
  RegisterFail,
} from '../actions/register.action';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/common/toast.service';

@Injectable()
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  @Effect()
  register$: Observable<any> = this.actions$
    .pipe(ofType(registerActions.REGISTER))
    .pipe(
      map((action: Register) => action.payload),
      switchMap((payload) => {
        return this.userService.registerUser(payload).pipe(
          map((response) => {
            return new RegisterSuccess(response);
          }),
          catchError((error) => of(new RegisterFail(error.message)))
        );
      })
    );

  @Effect({ dispatch: false })
  registerSuccess$: Observable<any> = this.actions$.pipe(
    ofType(registerActions.REGISTER_SUCCESS),
    tap(() => {
      this.toastService.success('Account has been created');
      this.router.navigate(['login']);
    })
  );

  @Effect({ dispatch: false })
  registerFailure$: Observable<any> = this.actions$.pipe(
    ofType(registerActions.REGISTER_FAIL),
    tap(() => {})
  );
}
