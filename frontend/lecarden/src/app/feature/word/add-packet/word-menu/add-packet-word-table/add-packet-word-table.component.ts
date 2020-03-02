import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/shared/models/word';

@Component({
  selector: 'app-add-packet-word-table',
  templateUrl: './add-packet-word-table.component.html',
  styleUrls: ['./add-packet-word-table.component.scss']
})
export class AddPacketWordTableComponent implements OnInit {
  @Input()
  words: Word[];
  @Output()
  addWord: EventEmitter<Word> = new EventEmitter<Word>();

  constructor() {}

  ngOnInit() {}

  emitAddWord(word: Word): void {
    this.addWord.emit(word);
  }
}
