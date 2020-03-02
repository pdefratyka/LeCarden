import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';

@Component({
  selector: 'app-add-packet',
  templateUrl: './add-packet.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './add-packet.component.scss'
  ]
})
export class AddPacketComponent implements OnInit {
  wordsInPacket: Word[];
  words: Word[]; // They will be loaded by resolver
  constructor() {}

  ngOnInit() {
    this.wordsInPacket = [];
    this.words = [];
    this.words.push({
      name: 'der Hund',
      translation: 'Pies',
      plural: '-',
      category: 'Tiere'
    } as Word);
    this.words.push({
      name: 'die Katze',
      translation: 'Kot',
      plural: '-',
      category: 'Tiere'
    } as Word);
    this.words.push({
      name: 'das Pferd',
      translation: 'Koń',
      plural: '-',
      category: 'Tiere'
    } as Word);
  }

  addWordToPacket(word: Word): void {
    const index: number = this.wordsInPacket.indexOf(word);
    if (index === -1) {
      this.wordsInPacket.push(word);
    }
    //
  }
}
