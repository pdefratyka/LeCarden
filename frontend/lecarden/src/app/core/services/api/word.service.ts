import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    /* const token = 'Bearer ' + this.tokenService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };*/
    return this.httpClient
      .post<Word>(this.url + '/userId/' + this.tokenService.getUserId(), word)
      .pipe(catchError(this.handleError));
  }

  getAllWords(): Observable<Word[]> {
    return this.httpClient
      .get<Word[]>(this.url)
      .pipe(catchError(this.handleError));
  }

  handleError() {
    return throwError('There was some problem with the server.');
  }
}
