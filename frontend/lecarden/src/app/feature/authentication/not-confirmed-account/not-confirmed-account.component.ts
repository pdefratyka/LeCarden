import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/security/token.service';
import { UserService } from 'src/app/core/services/api/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-not-confirmed-account',
  templateUrl: './not-confirmed-account.component.html',
  styleUrls: ['./not-confirmed-account.component.scss'],
})
export class NotConfirmedAccountComponent implements OnInit {
  email: string;
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {}
  sendConfirmationEmail(): void {
    this.email = this.tokenService.getEmail();
    this.userService.sendConfirmationEmail().pipe(take(1)).subscribe();
  }
}
