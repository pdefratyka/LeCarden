import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-word-menu',
  templateUrl: './word-menu.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './word-menu.component.scss',
  ],
})
export class WordMenuComponent {
  @Input()
  words: Word[];
  @Input()
  addedWordsIndex: number[];
  @Output()
  addWord: EventEmitter<Word> = new EventEmitter<Word>();
  @Output()
  filter: EventEmitter<string> = new EventEmitter<string>();

  emitAddWord(word: Word): void {
    this.addWord.emit(word);
  }
  emitFilter(filter: string): void {
    this.filter.emit(filter);
  }
}
