import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() {}

  getUserName(): string {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('TOKEN'));
    return decodedToken.sub;
  }

  getUserId(): string {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('TOKEN'));
    return decodedToken.userId;
  }

  getToken(): string {
    return localStorage.getItem('TOKEN');
  }

  setToken(token: string): void {
    localStorage.setItem('TOKEN', token);
  }
}
