import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/shared/models/word';

@Component({
  selector: 'app-word-table',
  templateUrl: './word-table.component.html',
  styleUrls: ['./word-table.component.scss'],
})
export class WordTableComponent {
  @Input()
  words: Word[];
  @Output()
  deleteWord: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  editWord: EventEmitter<Word> = new EventEmitter<Word>();
  @Output()
  loadWords: EventEmitter<void> = new EventEmitter<void>();

  emitEditWord(word: Word): void {
    this.editWord.emit(word);
  }

  emitDeleteWord(wordId: number, name: string): void {
    if (window.confirm(`Are you sure you want to delete word: ${name}`)) {
      this.deleteWord.emit(wordId);
    }
  }

  loadNextWords(): void {
    this.loadWords.emit();
  }
}
