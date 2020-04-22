import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from 'src/app/shared/models/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private readonly url = 'api/result-service/results';

  constructor(private readonly httpClient: HttpClient) {}

  saveResult(result: Result): Observable<Result> {
    return this.httpClient.post<Result>(this.url, result);
  }
}
