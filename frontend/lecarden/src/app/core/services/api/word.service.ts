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
  private readonly url = `${EnvironmentService.getUrl()}/words/words`;
  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  saveWord(word: Word): Observable<Word> {
    return this.httpClient
      .post<Word>(this.url, this.getWordWithUserId(word))
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
        `${this.url}/user-id/${this.tokenService.getUserId()}/categories`
      )
      .pipe(catchError(this.handleError));
  }

  getWordsByPacketId(packetId: number): Observable<Word[]> {
    return this.httpClient
      .get<Word[]>(`${this.url}/packet-id/${packetId}`)
      .pipe(catchError(this.handleError));
  }

  updateWord(word: Word): Observable<Word> {
    return this.httpClient.put<Word>(this.url, word);
  }

  deleteWord(wordId: number) {
    return this.httpClient.delete(`${this.url}/${wordId}`);
  }

  handleError() {
    return throwError('There was some problem with the server.');
  }

  private getWordWithUserId(word: Word): Word {
    return {
      id: word.id,
      name: word.name,
      translation: word.translation,
      plural: word.plural,
      category: word.category,
      imageUrl: word.imageUrl,
      audioUrl: word.audioUrl,
      builtIn: word.builtIn,
      userId: this.tokenService.getUserId(),
      languageId: word.languageId,
      languageTO: word.languageTO,
      example: word.example,
    } as Word;
  }
}
