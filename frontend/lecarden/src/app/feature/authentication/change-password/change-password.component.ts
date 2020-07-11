import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/api/user.service';
import { take, flatMap } from 'rxjs/operators';
import { ToastService } from 'src/app/core/services/common/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordState, ChangePassword } from '../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  constructor(
    private readonly toastService: ToastService,
    private readonly route: ActivatedRoute,
    private store: Store<ChangePasswordState>
  ) {}

  changePassword(password: string) {
    const queryName = 'token';

    // it works but why?
    this.route.queryParams.pipe(take(1)).subscribe(
      (params) => {
        this.store.dispatch(
          new ChangePassword({ token: params[queryName], password })
        );
      },
      () =>
        this.toastService.error(
          'There was some problem with changing your password'
        )
    );
  }
}
