import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/api/user.service';
import { take, finalize } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/common/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../styles/authentication.scss', './register.component.scss'],
})
export class RegisterComponent {
  invalidData = false;
  loadGif = false;
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  register(user: User): void {
    this.loadGif = true;
    this.invalidData = false;
    this.userService
      .registerUser(user)
      .pipe(
        take(1),
        finalize(() => {
          this.loadGif = false;
        })
      )
      .subscribe(
        () => {
          this.toastService.success('Account has been created');
          this.router.navigateByUrl('/login#created');
        },
        () => {
          this.toastService.error('Failed');
          this.invalidData = true;
        }
      );
  }
}
