import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Word } from 'src/app/shared/models/word';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class WordService {
  private readonly url = 'http://localhost:8080/words';
  constructor(private readonly httpClient: HttpClient) {}

  saveWord(word: Word) {
    return this.httpClient
      .post<Word>(this.url, word)
      .pipe(catchError(this.handleError));
  }

  handleError() {
    return throwError('Word has been not added. There was some Error.');
  }
}
