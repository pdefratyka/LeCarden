import { Injectable } from '@angular/core';
import { TokenService } from '../security/token.service';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class LoginHandlerService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  public handleSuccessfulLogin(response: string): void {
    const jwt = 'jwt';
    console.log(response);
    this.tokenService.setToken(response[jwt]);
    this.toastService.success(`Hallo ${this.tokenService.getUserName()}`);
    console.log(this.tokenService.getConfirmed());
    if (this.tokenService.getConfirmed()) {
      this.router.navigate(['add-word']);
    } else {
      this.router.navigate(['not-confirmed-account']);
    }
  }
}
