import { Component, OnInit, Input } from '@angular/core';
import { Word } from 'src/app/shared/models/word';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss']
})
export class WordsListComponent implements OnInit {
  @Input()
  wordsInPacket: Word[];

  constructor() {}

  ngOnInit() {}

  removeWord(word: Word): void {
    const index: number = this.wordsInPacket.indexOf(word);
    if (index !== -1) {
      this.wordsInPacket.splice(index, 1);
    }
  }
}
