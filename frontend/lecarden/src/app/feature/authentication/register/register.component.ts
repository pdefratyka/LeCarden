import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/api/user.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  user: User;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {
    this.registerForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  register(): void {
    this.userService
      .registerUser(this.getUserFromForm())
      .pipe(take(1))
      .subscribe(response => console.log(response));
      //should redirect to login page
  }

  private getUserFromForm(): User {
    return {
      login: this.registerForm.get('login').value,
      password: this.registerForm.get('password').value,
      email: this.registerForm.get('email').value
    } as User;
  }

  get login() {
    return this.registerForm.get('login');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
