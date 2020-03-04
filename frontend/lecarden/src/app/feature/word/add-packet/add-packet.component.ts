import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { PacketService } from 'src/app/core/services/api/packet.service';

@Component({
  selector: 'app-add-packet',
  templateUrl: './add-packet.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './add-packet.component.scss'
  ]
})
export class AddPacketComponent implements OnInit {
  wordsInPacket: Word[] = [];
  words: Word[];
  addedWordsIndex: Map<number, boolean> = new Map<number, boolean>();
  constructor(
    private readonly route: ActivatedRoute,
    private readonly packetService: PacketService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        map(data => data.words),
        take(1)
      )
      .subscribe(val => {
        this.words = val;
        this.words.forEach(w => this.addedWordsIndex.set(w.id, false));
      });
  }

  addWordToPacket(word: Word): void {
    const index: number = this.wordsInPacket.indexOf(word);
    if (index === -1) {
      this.wordsInPacket.push(word);
      this.addedWordsIndex.set(word.id, true);
    }
  }

  removeWord(word: Word): void {
    const index: number = this.wordsInPacket.indexOf(word);
    if (index !== -1) {
      this.wordsInPacket.splice(index, 1);
      this.addedWordsIndex.set(word.id, false);
    }
  }

  savePacket(packetName: string): void {
    this.packetService.savePacket(packetName, this.wordsInPacket);
  }
}
