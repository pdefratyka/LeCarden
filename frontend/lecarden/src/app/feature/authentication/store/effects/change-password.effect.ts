import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/core/services/api/user.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/common/toast.service';
import {
  changePasswordActions,
  ChangePassword,
  ChangePasswordSuccess,
  ChangePasswordFail,
} from '../actions';

@Injectable()
export class ChangePasswordEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  @Effect()
  changePassword$: Observable<any> = this.actions$
    .pipe(ofType(changePasswordActions.CHANGE_PASSWORD))
    .pipe(
      map((action: ChangePassword) => action.payload),
      switchMap((payload) => {
        console.log(payload);
        return this.userService
          .changePassword(payload.password, payload.token)
          .pipe(
            map((response) => {
              return new ChangePasswordSuccess(response);
            }),
            catchError((error) => of(new ChangePasswordFail(error.message)))
          );
      })
    );

  @Effect({ dispatch: false })
  changePasswordSuccess$: Observable<any> = this.actions$.pipe(
    ofType(changePasswordActions.CHANGE_PASSWORD_SUCCESS),
    tap(() => {
      this.toastService.success('Password has been changed.');
      this.router.navigate(['login']);
    })
  );

  @Effect({ dispatch: false })
  changePasswordFail$: Observable<any> = this.actions$.pipe(
    ofType(changePasswordActions.CHANGE_PASSWORD_FAIL),
    tap(() => {
      this.toastService.error('There was some problem. Try again later.');
    })
  );
}
