import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/api/user.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { CustomValidatorService } from 'src/app/core/services/validators/custom-validator-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './../styles/authentication.scss',
    './register.component.scss'
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;
  user: User;
  // write validator to confirm password so it will match first password
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.initRegisterForm();
  }

  register(): void {
    this.userService
      .registerUser(this.getUserFromForm())
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigateByUrl('/login#created');
      });
  }

  private getUserFromForm(): User {
    return {
      login: this.registerForm.get('login').value,
      password: this.registerForm.get('password').value,
      email: this.registerForm.get('email').value
    } as User;
  }

  private initRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: [
        '',
        [
          Validators.required,
          CustomValidatorService.forbiddenValidator(['qwe', 'asd'], 'ddd')
        ]
      ]
    });
  }
}
