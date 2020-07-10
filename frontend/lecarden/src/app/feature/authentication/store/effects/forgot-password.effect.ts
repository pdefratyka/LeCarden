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
import {
  remindPasswordActions,
  RemindPassword,
  RemindPasswordSuccess,
  RemindPasswordFail,
} from '../actions';

@Injectable()
export class RemindPasswordEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  @Effect()
  remindPassword$: Observable<any> = this.actions$
    .pipe(ofType(remindPasswordActions.REMIND_PASSWORD))
    .pipe(
      map((action: RemindPassword) => action.payload),
      switchMap((payload) => {
        console.log(payload);
        return this.userService.sendPasswordReseterEmail(payload).pipe(
          map((response) => {
            return new RemindPasswordSuccess(response);
          }),
          catchError((error) => of(new RemindPasswordFail(error.message)))
        );
      })
    );

  @Effect({ dispatch: false })
  remindPasswordSuccess$: Observable<any> = this.actions$.pipe(
    ofType(remindPasswordActions.REMIND_PASSWORD_SUCCESS),
    tap(() => {
      this.toastService.success('Email has been sent');
      this.router.navigate(['login']);
    })
  );

  @Effect({ dispatch: false })
  remindPasswordFail$: Observable<any> = this.actions$.pipe(
    ofType(remindPasswordActions.REMIND_PASSWORD_FAIL),
    tap(() => {
      this.toastService.error('There was some problem. Try again later.');
    })
  );
}
