import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/shared/models/word';

@Component({
  selector: 'app-word-menu',
  templateUrl: './word-menu.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './word-menu.component.scss'
  ]
})
export class WordMenuComponent {
  @Input()
  words: Word[];
  @Input()
  addedWordsIndex: Map<number, boolean>;
  @Output()
  addWord: EventEmitter<Word> = new EventEmitter<Word>();
  constructor() {}

  emitAddWord(word: Word): void {
    this.addWord.emit(word);
  }
}
