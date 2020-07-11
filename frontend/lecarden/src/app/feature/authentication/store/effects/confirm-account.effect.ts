import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/core/services/api/user.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/common/toast.service';
import {
  confirmAccountActions,
  ConfirmAccount,
  ConfirmAccountSuccess,
  ConfirmAccountFail,
} from '../actions';

@Injectable()
export class ConfirmAccountEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  @Effect()
  confirmAccount$: Observable<any> = this.actions$
    .pipe(ofType(confirmAccountActions.CONFIRM_ACCOUNT))
    .pipe(
      map((action: ConfirmAccount) => action.payload),
      switchMap((payload) => {
        console.log(payload);
        return this.userService.sendConfirmationEmail().pipe(
          map((response) => {
            return new ConfirmAccountSuccess(response);
          }),
          catchError((error) => of(new ConfirmAccountFail(error.message)))
        );
      })
    );

  @Effect({ dispatch: false })
  confirmAccountSuccess$: Observable<any> = this.actions$.pipe(
    ofType(confirmAccountActions.CONFIRM_ACCOUNT_SUCCESS),
    tap(() => {
      this.toastService.success('Email has been sent.');
      this.router.navigate(['login']);
    })
  );

  @Effect({ dispatch: false })
  confirmAccountFail$: Observable<any> = this.actions$.pipe(
    ofType(confirmAccountActions.CONFIRM_ACCOUNT_FAIL),
    tap(() => {
      this.toastService.error('There was some problem. Try again later.');
    })
  );
}
