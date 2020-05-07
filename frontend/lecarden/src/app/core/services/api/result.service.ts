import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from 'src/app/shared/models/result';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private readonly url = 'api/result-service/results';

  constructor(private readonly httpClient: HttpClient) {}

  saveResult(result: Result): Observable<Result> {
    return this.httpClient.post<Result>(this.url, result);
  }

  getLastResult(userId: number, packetId: number): Observable<Result[]> {
    return this.httpClient
      .get<Result[]>(`${this.url}/users/${userId}/packets/${packetId}`)
      .pipe(catchError(this.handleError));
  }

  handleError() {
    return throwError('There was some problem with the server.');
  }
}
