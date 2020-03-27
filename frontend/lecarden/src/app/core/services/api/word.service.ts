import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Word } from 'src/app/shared/models/word';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../security/token.service';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private readonly url = 'api/word-service/words';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  saveWord(word: Word): Observable<Word> {
    return this.httpClient
      .post<Word>(`${this.url}/user-id/${this.tokenService.getUserId()}`, word)
      .pipe(catchError(this.handleError));
  }

  getAllWords(): Observable<Word[]> {
    return this.httpClient
      .get<Word[]>(`${this.url}/user-id/${this.tokenService.getUserId()}`)
      .pipe(catchError(this.handleError));
  }

  getAllWordsCategoriesByUser(): Observable<string[]> {
    return this.httpClient
      .get<string[]>(
        `${this.url}/categories/user-id/${this.tokenService.getUserId()}`
      )
      .pipe(catchError(this.handleError));
  }

  handleError() {
    return throwError('There was some problem with the server.');
  }
}
