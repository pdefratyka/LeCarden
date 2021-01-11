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
      return helper.decodeToken(localStorage.getItem('TOKEN')).user_name;
    }
    return '';
  }

  getUserId(): number {
    if (this.authService.isLoggedIn()) {
      const helper = new JwtHelperService();
      return helper.decodeToken(localStorage.getItem('TOKEN')).userId;
      // TODO Is it smart to decode it each time? It would be better to store it in some other variable
    }
    return null;
  }

  getConfirmed(): boolean {
    if (this.authService.isLoggedIn()) {
      const helper = new JwtHelperService();
      //return helper.decodeToken(localStorage.getItem('TOKEN')).confirmed;
      return true;
    }
    return false;
  }

  getEmail(): string {
    if (this.authService.isLoggedIn()) {
      const helper = new JwtHelperService();
      return helper.decodeToken(localStorage.getItem('TOKEN')).email;
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
