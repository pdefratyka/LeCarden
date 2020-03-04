import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/shared/models/word';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss']
})
export class WordsListComponent {
  @Input()
  wordsInPacket: Word[];
  @Output()
  removeWord: EventEmitter<Word> = new EventEmitter<Word>();

  constructor() {}

  emitRemoveWord(word: Word): void {
    this.removeWord.emit(word);
  }
}
