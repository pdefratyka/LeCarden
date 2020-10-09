import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Word } from 'src/app/shared/models/word';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../security/token.service';
import { EnvironmentService } from '../helpers/environment.service';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private readonly url = `${EnvironmentService.getUrl()}/word-service/words`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  saveWord(word: Word): Observable<Word> {
    return this.httpClient
      .post<Word>(`${this.url}/user-id/${this.tokenService.getUserId()}`, word)
      .pipe(catchError(this.handleError));
  }

  getWordById(wordId: string): Observable<Word> {
    return this.httpClient
      .get<Word>(`${this.url}/${wordId}`)
      .pipe(catchError(this.handleError));
  }

  getAllWords(query: string, pageNumber: number): Observable<Word[]> {
    return this.httpClient
      .get<Word[]>(
        `${
          this.url
        }/user-id/${this.tokenService.getUserId()}?query=${query}&page=${pageNumber}`
      )
      .pipe(catchError(this.handleError));
  }

  getAllWordsCategoriesByUser(): Observable<string[]> {
    return this.httpClient
      .get<string[]>(
        `${this.url}/categories/user-id/${this.tokenService.getUserId()}`
      )
      .pipe(catchError(this.handleError));
  }

  getWordsByPacketId(packetId: number): Observable<Word[]> {
    console.log('get Words');
    return this.httpClient
      .get<Word[]>(`${this.url}/packet-id/${packetId}`)
      .pipe(catchError(this.handleError));
  }

  updateWord(word: Word): Observable<Word> {
    return this.httpClient.put<Word>(`${this.url}`, word);
  }

  deleteWord(wordId: number) {
    return this.httpClient.delete(`${this.url}/${wordId}`);
  }

  handleError() {
    return throwError('There was some problem with the server.');
  }
}
