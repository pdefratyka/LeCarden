import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/shared/models/word';

@Component({
  selector: 'app-add-packet-word-table',
  templateUrl: './add-packet-word-table.component.html',
  styleUrls: ['./add-packet-word-table.component.scss']
})
export class AddPacketWordTableComponent {
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
