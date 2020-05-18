import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly tokenService: TokenService
  ) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    } else if (
      this.authService.isLoggedIn() &&
      !this.tokenService.getConfirmed()
    ) {
      this.router.navigate(['not-confirmed-account']);
      return true;
    }

    return true;
  }
}
