import { Component } from '@angular/core';
import { TokenService } from 'src/app/core/services/security/token.service';
import { UserService } from 'src/app/core/services/api/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-not-confirmed-account',
  templateUrl: './not-confirmed-account.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './../styles/authentication.scss',
    './not-confirmed-account.component.scss',
  ],
})
export class NotConfirmedAccountComponent {
  email: string;
  error = false;
  errorMessage: string;
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService
  ) {}

  sendConfirmationEmail(): void {
    this.error = false;
    this.email = null;
    this.userService
      .sendConfirmationEmail()
      .pipe(take(1))
      .subscribe(
        () => (this.email = this.tokenService.getEmail()),
        (error) => {
          this.error = true;
          this.errorMessage = error;
        }
      );
  }
}
