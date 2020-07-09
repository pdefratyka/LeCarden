import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { User } from 'src/app/shared/models/user';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../security/token.service';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url = 'api/user-service/users';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  registerUser(user: User): Observable<User> {
    console.log(user);
    return this.httpClient
      .post<User>(this.url, user, httpOptions)
      .pipe(catchError((error) => this.handleError(error)));
  }

  sendConfirmationEmail() {
    return this.httpClient
      .post(
        this.url +
          '/' +
          this.tokenService.getUserId() +
          '/send-confirmation-email',
        httpOptions
      )
      .pipe(catchError((error) => this.handleError(error)));
  }

  sendPasswordReseterEmail(email: string) {
    return this.httpClient
      .post(this.url + '/reset-password?email=' + email, httpOptions)
      .pipe(catchError((error) => this.handleError(error)));
  }

  changePassword(password: string, token: string) {
    return this.httpClient
      .post<string>(
        this.url + '/change-password?token=' + token,
        password,
        httpOptions
      )
      .pipe(catchError((error) => this.handleError(error)));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
