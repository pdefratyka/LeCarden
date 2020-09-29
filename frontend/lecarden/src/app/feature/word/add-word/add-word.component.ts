import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import {
  WordsState,
  getCategories,
  getCurrentWord,
  getLanguages,
  LanguagePageAction,
} from '../store';
import { Store } from '@ngrx/store';
import { WordPageAction } from '../store';
import { Observable } from 'rxjs';
import { Language } from 'src/app/shared/models/language';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './add-word.component.scss',
  ],
})
export class AddWordComponent implements OnInit {
  categories$: Observable<string[]>;
  word$: Observable<Word>;
  languages$: Observable<Language[]>;
  constructor(private readonly store: Store<WordsState>) {}

  ngOnInit(): void {
    this.store.dispatch(WordPageAction.loadWords({ query: '' }));
    this.store.dispatch(LanguagePageAction.loadLanguages());
    this.categories$ = this.store.select(getCategories);
    this.word$ = this.store.select(getCurrentWord);
    this.languages$ = this.store.select(getLanguages);
  }

  saveWord(word: Word): void {
    let isEditMode = false;
    if (word.id) {
      isEditMode = true;
    }
    this.store.dispatch(WordPageAction.saveWord({ word, isEditMode }));
  }

  clearWord(): void {
    this.store.dispatch(WordPageAction.clearCurrentWord());
  }
}
