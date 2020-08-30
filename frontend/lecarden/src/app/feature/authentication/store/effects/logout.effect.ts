import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/core/services/security/auth.service';
import { Observable } from 'rxjs';
import { logoutActions, Logout, LogoutSuccess } from '../actions/logout.action';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

@Injectable()
export class LogoutEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  @Effect()
  logout$: Observable<any> = this.actions$
    .pipe(ofType(logoutActions.LOGOUT))
    .pipe(
      map((action: Logout) => action),
      switchMap((action) => {
        return this.authService.logout().pipe(
          map((response) => {
            return new LogoutSuccess();
          })
        );
      })
    );
}
