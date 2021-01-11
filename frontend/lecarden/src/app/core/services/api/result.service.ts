import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from 'src/app/shared/models/result';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../security/token.service';
import { EnvironmentService } from '../helpers/environment.service';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private readonly url = `${EnvironmentService.getUrl()}/results/results`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  saveResult(result: Result): Observable<Result> {
    const tempResult: Result = { ...result };
    tempResult.userId = this.tokenService.getUserId();
    return this.httpClient.post<Result>(this.url, tempResult);
  }

  getLastResult(packetId: number): Observable<Result[]> {
    const userId = this.tokenService.getUserId();
    return this.httpClient
      .get<Result[]>(
        `${this.url}${this.tokenService.getUserId()}/packets/${packetId}`
      )
      .pipe(catchError(this.handleError));
  }

  getAllLastResultsForUser(): Observable<Result[]> {
    const userId = this.tokenService.getUserId();
    return this.httpClient
      .get<Result[]>(`${this.url}/user-id/${this.tokenService.getUserId()}`)
      .pipe(catchError(this.handleError));
  }

  handleError() {
    return throwError('There was some problem with the server.');
  }
}
