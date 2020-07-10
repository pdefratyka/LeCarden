import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/api/user.service';
import { take } from 'rxjs/operators';
import { ToastService } from 'src/app/core/services/common/toast.service';
import { Store } from '@ngrx/store';
import { RemindPasswordState, RemindPassword } from '../store';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  constructor(
    private readonly userService: UserService,
    private readonly toastService: ToastService,
    private store: Store<RemindPasswordState>
  ) {}

  sendEmailWithPasswordRestarter(email: string): void {
    this.store.dispatch(new RemindPassword(email));
    /*this.userService
      .sendPasswordReseterEmail(email)
      .pipe(take(1))
      .subscribe(
        () => this.toastService.success('Email has been sent to given address'),
        () =>
          this.toastService.error(
            'There was some problem with sending an email'
          )
      );*/
  }
}
