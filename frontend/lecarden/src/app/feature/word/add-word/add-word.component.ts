import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { WordsState, getCategories } from '../store';
import { Store } from '@ngrx/store';
import { WordPageAction } from '../store';
import { Observable } from 'rxjs';

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
  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<WordsState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(WordPageAction.loadWords({ query: '' }));
    this.categories$ = this.store.select(getCategories);
    this.getWordFromResolver();
  }

  saveWord(word: Word): void {
    let isEditMode = false;
    if (word.id) {
      isEditMode = true;
    }
    this.store.dispatch(WordPageAction.saveWord({ word, isEditMode }));
  }

  private getWordFromResolver(): void {
    this.word$ = this.route.data.pipe(map((data) => data.word));
  }
}
