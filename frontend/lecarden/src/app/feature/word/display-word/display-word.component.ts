import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { WordsState } from '../store';
import { Store } from '@ngrx/store';
import { WordPageAction } from '../store';
import { Observable } from 'rxjs';
import { getWords } from '../store';
import { map } from 'rxjs/operators';
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
  pageNumber = 1;
  query = '';
  constructor(private store: Store<WordsState>) {
    this.words$ = this.store.select(getWords);
  }

  ngOnInit(): void {
    this.store.dispatch(
      WordPageAction.loadWords({ query: '', pageNumber: this.pageNumber })
    );
  }

  filterWords(query: string): void {
    this.query = query;
    this.pageNumber = 1;
    this.store.dispatch(
      WordPageAction.loadWords({ query, pageNumber: this.pageNumber })
    );
    this.words$ = this.store.select(getWords);
  }

  deleteWord(wordId: number): void {
    this.store.dispatch(WordPageAction.deleteWord({ wordId }));
  }

  editWord(word: Word): void {
    this.store.dispatch(WordPageAction.editWord({ word }));
  }

  loadWordsOnScroll(): void {
    this.pageNumber++;
    this.store.dispatch(
      WordPageAction.loadWords({
        query: this.query,
        pageNumber: this.pageNumber,
      })
    );
  }
}
