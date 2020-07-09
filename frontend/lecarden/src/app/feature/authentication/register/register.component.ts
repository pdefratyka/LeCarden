import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/api/user.service';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/common/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { RegisterState } from '../store/reducers/register.reducer';
import { Register } from '../store/actions/register.action';
import { Observable, Subscription } from 'rxjs';
import { getRegisterState } from '../store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../styles/authentication.scss', './register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  loadGif = false;
  errorMessage = '';
  state: Observable<any>;
  $registerSubscription = new Subscription();
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private store: Store<RegisterState>
  ) {
    this.state = store.select(getRegisterState);
  }

  ngOnInit(): void {
    this.$registerSubscription = this.state.subscribe((state) => {
      if (state?.register?.errorMessage) {
        this.loadGif = false;
        this.errorMessage = 'LABEL.LOGIN_ALREADY_EXIST';;
      }
    });
  }

  ngOnDestroy(): void {
    this.$registerSubscription.unsubscribe();
  }

  register(user: User): void {
    this.loadGif = true;
    this.errorMessage = '';
    this.store.dispatch(new Register(user));
    /*this.userService
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
      */
  }

  private resolveErrorMessage(error: HttpErrorResponse): void {
    if (error.error.message.includes('Login')) {
      this.errorMessage = 'LABEL.LOGIN_ALREADY_EXIST';
    } else if (error.error.message.includes('Email')) {
      this.errorMessage = 'LABEL.EMAIL_ALREADY_ASSIGNED';
    }
  }
}
