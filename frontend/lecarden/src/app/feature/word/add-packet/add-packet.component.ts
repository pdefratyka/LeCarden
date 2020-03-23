import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { PacketService } from 'src/app/core/services/api/packet.service';
import { Packet } from 'src/app/shared/models/packet';
import { WordHelperService } from 'src/app/core/services/helpers/word-helper.service';

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
  filteredWords: Word[];
  packetName: string;
  addedWordsIndex: Map<number, boolean> = new Map<number, boolean>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly packetService: PacketService,
    private readonly router: Router,
    private readonly wordHelperService: WordHelperService
  ) {}

  ngOnInit() {
    this.getWordsFromResolver();
    this.getPacketFromResolver();
  }

  addWordToPacket(word: Word): void {
    const index = this.wordsInPacket.indexOf(word);
    if (index === -1) {
      this.wordsInPacket.push(word);
      this.addedWordsIndex.set(word.id, true);
    }
  }

  removeWord(word: Word): void {
    const index = this.wordsInPacket.indexOf(word);
    if (index !== -1) {
      this.wordsInPacket.splice(index, 1);
      this.addedWordsIndex.set(word.id, false);
    }
  }

  savePacket(packetName: string): void {
    const packetId = this.route.snapshot.paramMap.get('id');
    this.packetService
      .savePacket({
        id: Number(packetId),
        name: packetName,
        words: this.wordsInPacket
      } as Packet)
      .pipe(take(1))
      .subscribe(() => this.router.navigate(['display-packet']));
  }

  clearWordsInPacket(): void {
    this.wordsInPacket.length = 0;
    this.words.forEach(w => this.addedWordsIndex.set(w.id, false));
  }

  filterWords(filter: string): void {
    this.filteredWords = this.wordHelperService.filterWords(this.words, filter);
  }

  private getWordsFromResolver(): void {
    this.route.data
      .pipe(
        map(data => data.words),
        take(1)
      )
      .subscribe(val => {
        this.words = val;
        this.filteredWords = val;
        this.words.forEach(w => this.addedWordsIndex.set(w.id, false));
      });
  }

  private getPacketFromResolver(): void {
    this.route.data
      .pipe(
        map(data => data.packet),
        take(1)
      )
      .subscribe(val => {
        if (val !== undefined) {
          val.words.forEach((w: Word) => this.addWordToPacket(w));
          this.packetName = val.name;
        }
      });
  }
}
