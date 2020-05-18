import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/models/user';
import { Observable } from 'rxjs';
import { TokenService } from '../security/token.service';

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
    return this.httpClient.post<User>(this.url, user, httpOptions);
  }

  sendConfirmationEmail(): Observable<void> {
    return this.httpClient.post<void>(
      this.url +
        '/' +
        this.tokenService.getUserId() +
        '/send-confirmation-email',
      httpOptions
    );
  }
}
