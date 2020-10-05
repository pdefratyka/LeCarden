import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/shared/models/word';

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
  @Output()
  loadWords: EventEmitter<void> = new EventEmitter<void>();

  emitAddWord(word: Word): void {
    this.addWord.emit(word);
  }
  emitFilter(filter: string): void {
    this.filter.emit(filter);
  }

  emitLoadWords(): void {
    this.loadWords.emit();
  }
}
