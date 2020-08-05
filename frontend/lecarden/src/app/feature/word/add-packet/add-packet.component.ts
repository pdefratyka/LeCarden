import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { PacketState } from '../store/reducers/packets.reducer';
import {
  PacketPageAction,
  WordPageAction,
  getWords,
  getWordsFromCurrentPacket,
  getCurrentPacket,
  getCurrentPacketName,
  getWordsIdsFromCurrentPacket,
} from '../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-packet',
  templateUrl: './add-packet.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './add-packet.component.scss',
  ],
})
export class AddPacketComponent implements OnInit {
  wordsInPacket$: Observable<Word[]>;
  packetName$: Observable<string>;
  addedWordsIndex$: Observable<number[]>;
  words$: Observable<Word[]>;
  constructor(private readonly store: Store<PacketState>) {}

  ngOnInit() {
    this.store.dispatch(WordPageAction.loadWords({ query: '' }));
    this.words$ = this.store.select(getWords);
    this.wordsInPacket$ = this.store.select(getWordsFromCurrentPacket);
    this.packetName$ = this.store.select(getCurrentPacketName);
    this.addedWordsIndex$ = this.store.select(getWordsIdsFromCurrentPacket);
  }

  addWordToPacket(word: Word): void {
    this.store.dispatch(PacketPageAction.addWordToPacket({ word }));
  }

  removeWord(word: Word): void {
    this.store.dispatch(
      PacketPageAction.removeWordFromPacket({ wordId: word.id })
    );
  }

  savePacket(name: string): void {
    this.store.dispatch(PacketPageAction.setCurrentPacketName({ name }));
    // TODO It might not be the best solution. Think about it.
    this.store
      .select(getCurrentPacket)
      .pipe(take(1))
      .subscribe((packet) => {
        this.store.dispatch(
          PacketPageAction.savePacket({
            packet,
          })
        );
      });
  }

  clearWordsInPacket(): void {
    //this.wordsInPacket.length = 0;
    //this.words.forEach((w) => this.addedWordsIndex.set(w.id, false));
    this.store.dispatch(PacketPageAction.clearCurrentPacket());
  }

  filterWords(query: string): void {
    this.store.dispatch(WordPageAction.loadWords({ query }));
  }

  setPacketName(name: string): void {
    this.store.dispatch(PacketPageAction.setCurrentPacketName({ name }));
  }
}
