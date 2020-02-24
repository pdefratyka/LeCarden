import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Word } from 'src/app/shared/models/word';
import { Observable, BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class WordService {
  private observableWord: BehaviorSubject<Word>;
  private readonly url = 'http://localhost:9095/words';
  constructor(private readonly httpClient: HttpClient) {}

  saveWord(word: Word): Observable<Word> {
    this.observableWord = new BehaviorSubject(word);
    return this.observableWord;
  }
}
