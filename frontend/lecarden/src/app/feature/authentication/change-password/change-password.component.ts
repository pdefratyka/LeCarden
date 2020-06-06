import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/api/user.service';
import { take, flatMap } from 'rxjs/operators';
import { ToastService } from 'src/app/core/services/common/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  constructor(
    private readonly userService: UserService,
    private readonly toastService: ToastService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  changePassword(password: string) {
    const queryName = 'token';

    // it works but why?
    this.route.queryParams
      .pipe(
        take(1),
        flatMap((params) =>
          this.userService.changePassword(password, params[queryName])
        )
      )
      .subscribe(
        () => {
          this.toastService.success('Password has been changed');
          this.router.navigate(['login']);
        },
        () =>
          this.toastService.error(
            'There was some problem with changing your password'
          )
      );
  }
}
