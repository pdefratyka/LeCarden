import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { WordsState } from '../store';
import { Store } from '@ngrx/store';
import { WordPageAction } from '../store';
import { Observable } from 'rxjs';
import { getWords } from '../store';
@Component({
  selector: 'app-display-word',
  templateUrl: './display-word.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './display-word.component.scss',
  ],
})
export class DisplayWordComponent implements OnInit {
  words$: Observable<Word[]>;
  constructor(private store: Store<WordsState>) {}

  // TODO Make edit mode with state management, add variable currentWord and in effect should
  // TODO be redirection(/add-word instead of /add-word/{id})

  ngOnInit(): void {
    this.store.dispatch(WordPageAction.loadWords({ query: '' }));
    this.words$ = this.store.select(getWords);
  }
  filterWords(query: string): void {
    this.store.dispatch(WordPageAction.loadWords({ query }));
  }
  deleteWord(wordId: number): void {
    this.store.dispatch(WordPageAction.deleteWord({ wordId }));
  }
}
