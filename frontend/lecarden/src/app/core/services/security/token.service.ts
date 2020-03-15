import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private helper = new JwtHelperService();
  private decodedToken = this.helper.decodeToken(localStorage.getItem('TOKEN'));
  constructor() {}

  getUserName(): string {
    return this.decodedToken.sub;
  }

  getUserId(): string {
    return this.decodedToken.userId;
  }

  getToken(): string {
    return localStorage.getItem('TOKEN');
  }
}
