import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Packet } from 'src/app/shared/models/packet';
import { FilterService } from 'src/app/core/services/helpers/filter.service';
import { Store } from '@ngrx/store';
import { PacketState } from '../store/reducers/packets.reducer';
import { PacketPageAction } from '../store';

@Component({
  selector: 'app-add-packet',
  templateUrl: './add-packet.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './add-packet.component.scss',
  ],
})
export class AddPacketComponent implements OnInit {
  wordsInPacket: Word[] = [];
  words: Word[];
  filteredWords: Word[];
  packetName: string;
  addedWordsIndex: Map<number, boolean> = new Map<number, boolean>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly filterService: FilterService,
    private readonly store: Store<PacketState>
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
    const packet = {
      id: Number(packetId),
      name: packetName,
      words: this.wordsInPacket,
    } as Packet;
    this.store.dispatch(PacketPageAction.savePacket({ packet }));
  }

  clearWordsInPacket(): void {
    this.wordsInPacket.length = 0;
    this.words.forEach((w) => this.addedWordsIndex.set(w.id, false));
  }

  filterWords(filter: string): void {
    this.filteredWords = this.filterService.filterWords(this.words, filter);
  }

  private getWordsFromResolver(): void {
    this.route.data
      .pipe(
        map((data) => data.words),
        take(1)
      )
      .subscribe((val) => {
        this.words = val;
        this.filteredWords = val;
        this.words.forEach((w) => this.addedWordsIndex.set(w.id, false));
      });
  }

  private getPacketFromResolver(): void {
    this.route.data
      .pipe(
        map((data) => data.packet),
        take(1)
      )
      .subscribe((val) => {
        if (val !== undefined) {
          val.words.forEach((w: Word) => this.addWordToPacket(w));
          this.packetName = val.name;
        }
      });
  }
}
