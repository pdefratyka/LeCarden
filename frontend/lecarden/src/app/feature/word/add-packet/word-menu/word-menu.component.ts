import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/shared/models/word';

@Component({
  selector: 'app-word-menu',
  templateUrl: './word-menu.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './word-menu.component.scss'
  ]
})
export class WordMenuComponent implements OnInit {
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
