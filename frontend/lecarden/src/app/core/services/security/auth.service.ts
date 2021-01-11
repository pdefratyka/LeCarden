import { Injectable } from '@angular/core';
import { LoginCredentials } from 'src/app/shared/models/loginCredentials';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { EnvironmentService } from '../helpers/environment.service';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Basic d29yZC1zZXJ2aWNlOnBhc3N3b3Jk',
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = `${EnvironmentService.getUrl()}/uaa/oauth/token`;

  itemValue = new BehaviorSubject(this.theItem);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  login(loginCredentials: LoginCredentials): Observable<any> {
    loginCredentials.grant_type = 'password';
    loginCredentials.scope = 'server';
    const body = new HttpParams()
      .set('scope', loginCredentials.scope)
      .set('username', loginCredentials.username)
      .set('password', loginCredentials.password)
      .set('grant_type', loginCredentials.grant_type);
    return this.httpClient.post<any>(this.url, body.toString(), {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic d29yZC1zZXJ2aWNlOnBhc3N3b3Jk')
        .set('Content-Type', 'application/x-www-form-urlencoded'),
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('TOKEN') !== null;
  }

  getToken(): string {
    return localStorage.getItem('TOKEN');
  }

  logout(): Observable<string> {
    const subject = new Subject();
    localStorage.clear();
    this.router.navigate(['login']);
    return of('Logout from observable');
  }

  get theItem() {
    return localStorage.getItem('TOKEN');
  }
}
