import { Injectable } from '@angular/core';
import { LoginCredentials } from 'src/app/shared/models/loginCredentials';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = '/api/user-service/authenticate';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  login(loginCredentials: LoginCredentials): Observable<string> {
    return this.httpClient.post<string>(
      this.url,
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
