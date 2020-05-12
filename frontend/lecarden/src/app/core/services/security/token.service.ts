import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private readonly authService: AuthService) {}

  getUserName(): string {
    if (this.authService.isLoggedIn()) {
      const helper = new JwtHelperService();
      return helper.decodeToken(localStorage.getItem('TOKEN')).sub;
    }
    return '';
  }

  getUserId(): number {
    if (this.authService.isLoggedIn()) {
      const helper = new JwtHelperService();
      return helper.decodeToken(localStorage.getItem('TOKEN')).userId;
    }
    return null;
  }

  getToken(): string {
    return localStorage.getItem('TOKEN');
  }

  setToken(token: string): void {
    localStorage.setItem('TOKEN', token);
  }
}
