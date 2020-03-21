import { Injectable } from '@angular/core';
import { LoginCredentials } from 'src/app/shared/models/loginCredentials';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}
  login(loginCredentials: LoginCredentials): Observable<string> {
    return this.httpClient.post<string>(
      'http://localhost:9092/authenticate',
      loginCredentials,
      httpOptions
    );
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('TOKEN') !== null;
  }
  getToken(): string {
    return localStorage.getItem('TOKEN');
  }
  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
