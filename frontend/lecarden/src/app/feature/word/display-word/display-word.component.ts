import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { WordsState } from '../store';
import { Store } from '@ngrx/store';
import { WordPageAction } from '../store';
import { Observable } from 'rxjs';
import { getWords } from '../store';
import { TabName } from '../../home/models/tabName';
import { TabSerivce } from 'src/app/core/services/helpers/tab.service';
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
  private pageNumber: number = 1;
  private query: string = '';

  constructor(
    private readonly store: Store<WordsState>,
    private readonly tabService: TabSerivce
  ) {
    this.words$ = this.store.select(getWords);
    this.tabService.setCurrentTab(TabName.DISPLAY_WORDS);
  }

  ngOnInit(): void {
    this.dispatchWords();
  }

  deleteWord(wordId: number): void {
    this.store.dispatch(WordPageAction.deleteWord({ wordId }));
  }

  editWord(word: Word): void {
    this.store.dispatch(WordPageAction.editWord({ word }));
  }

  filterWords(query: string): void {
    this.query = query;
    this.pageNumber = 1;
    this.dispatchWords();
    this.words$ = this.store.select(getWords);
  }

  loadWordsOnScroll(): void {
    this.pageNumber++;
    this.dispatchWords();
  }

  private dispatchWords(): void {
    this.store.dispatch(
      WordPageAction.loadWords({
        query: this.query,
        pageNumber: this.pageNumber,
      })
    );
  }
}
