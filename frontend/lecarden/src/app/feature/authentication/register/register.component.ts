import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/api/user.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../styles/authentication.scss', './register.component.scss']
})
export class RegisterComponent {
  invalidData = false;
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  register(user: User): void {
    this.userService
      .registerUser(user)
      .pipe(take(1))
      .subscribe(
        () => this.router.navigateByUrl('/login#created'),
        () => (this.invalidData = true)
      );
  }
}
