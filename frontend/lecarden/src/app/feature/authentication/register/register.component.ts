import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/api/user.service';
import { take, finalize } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/common/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../styles/authentication.scss', './register.component.scss'],
})
export class RegisterComponent {
  loadGif = false;
  errorMessage = '';
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  register(user: User): void {
    this.loadGif = true;
    this.errorMessage = '';
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
        (error) => {
          this.resolveErrorMessage(error);
          this.toastService.error('Failed');
        }
      );
  }

  private resolveErrorMessage(error: HttpErrorResponse): void {
    if (error.error.message.includes('Login')) {
      this.errorMessage = 'LABEL.LOGIN_ALREADY_EXIST';
    } else if (error.error.message.includes('Email')) {
      this.errorMessage = 'LABEL.EMAIL_ALREADY_ASSIGNED';
    }
  }
}
