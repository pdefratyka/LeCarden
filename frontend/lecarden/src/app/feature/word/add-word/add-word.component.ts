import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import {
  WordsState,
  getCategories,
  getCurrentWord,
  getLanguages,
  LanguagePageAction,
  CategoryPageAction,
} from '../store';
import { Store } from '@ngrx/store';
import { WordPageAction } from '../store';
import { Observable } from 'rxjs';
import { Language } from 'src/app/shared/models/language';
import { TabName } from '../../home/models/tabName';
import { TabSerivce } from 'src/app/core/services/helpers/tab.service';

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

  constructor(
    private readonly store: Store<WordsState>,
    private readonly tabService: TabSerivce
  ) {
    this.tabService.setCurrentTab(TabName.ADD_WORD);
  }

  ngOnInit(): void {
    this.store.dispatch(LanguagePageAction.loadLanguages());
    this.store.dispatch(CategoryPageAction.loadCategories());

    this.categories$ = this.store.select(getCategories);
    this.languages$ = this.store.select(getLanguages);
    this.word$ = this.store.select(getCurrentWord);
  }

  saveWord(word: Word): void {
    this.store.dispatch(
      WordPageAction.saveWord({ word, isEditMode: word.id !== undefined })
    );
  }

  clearWord(): void {
    this.store.dispatch(WordPageAction.clearCurrentWord());
  }
}
