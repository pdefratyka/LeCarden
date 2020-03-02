import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Word } from 'src/app/shared/models/word';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class WordService {
  private readonly url = 'http://localhost:8085/word-service/words';
  constructor(private readonly httpClient: HttpClient) {}

  saveWord(word: Word): Observable<Word> {
    return this.httpClient
      .post<Word>(this.url, word)
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
