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
    private readonly router: Router
  ) {}

  public handleSuccessfulLogin(response: string): void {
    const jwt = 'jwt';
    this.tokenService.setToken(response[jwt]);
    this.router.navigate(['add-word']);
  }
}
