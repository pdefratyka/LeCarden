import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/core/services/api/word.service';
import { Word } from 'src/app/shared/models/word';
import { take, map } from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message';
import { MessageType } from 'src/app/shared/models/messageTypes';
import { ActivatedRoute, Router } from '@angular/router';
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
  message: Message = new Message();
  categories$: Observable<string[]>;
  word: Word;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<WordsState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(WordPageAction.loadWords());
    this.categories$ = this.store.select(getCategories);
    this.getWordFromResolver();
  }

  saveWord(word: Word): void {
    this.store.dispatch(WordPageAction.saveWord({ word }));
  }

  private getWordFromResolver(): void {
    this.route.data
      .pipe(
        map((data) => data.word),
        take(1)
      )
      .subscribe((val) => {
        if (val !== undefined) {
          this.word = val;
        }
      });
  }
}
