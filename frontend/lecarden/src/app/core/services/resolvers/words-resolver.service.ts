import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Word } from 'src/app/shared/models/word';
import { Observable } from 'rxjs';
import { WordService } from '../api/word.service';

@Injectable({
  providedIn: 'root'
})
export class WordsResolverService implements Resolve<Word[]> {
  constructor(private readonly wordService: WordService) {}

  resolve(): Observable<Word[]> {
    return this.wordService.getAllWords();
  }
}
