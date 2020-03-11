import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/models/user';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = 'api/user-service/users';
  constructor(private readonly httpClient: HttpClient) {}

  registerUser(user: User): Observable<User> {
    return of({} as User);
    //return this.httpClient.post<User>(this.url, user, httpOptions);
  }
}
