import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { PacketState } from '../store/reducers/packets.reducer';
import {
  PacketPageAction,
  WordPageAction,
  getWords,
  getWordsFromCurrentPacket,
  getCurrentPacket,
  getCurrentPacketName,
  getLanguages,
  LanguagePageAction,
} from '../store';
import { Observable } from 'rxjs';
import { Language } from 'src/app/shared/models/language';
import { TabPageAction } from '../../store';
import { TabName } from '../../home/models/tabName';

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
  languages$: Observable<Language[]>;
  pageNumber = 1; // it should be stored in ng store
  query = '';

  constructor(private readonly store: Store<PacketState>) {
    this.words$ = this.store.select(getWords);
    this.wordsInPacket$ = this.store.select(getWordsFromCurrentPacket);
    this.packetName$ = this.store.select(getCurrentPacketName);
    this.languages$ = this.store.select(getLanguages);
    this.getAddedWordsIndexes();
    this.addedWordsIndex$ = this.getAddedWordsIndexes();
    this.store.dispatch(
      TabPageAction.setCurrentTab({ tab: TabName.CREATE_PACKET })
    );
  }

  ngOnInit() {
    this.store.dispatch(
      WordPageAction.loadWords({ query: '', pageNumber: this.pageNumber })
    );
    this.store.dispatch(LanguagePageAction.loadLanguages());
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
    this.store.dispatch(PacketPageAction.clearCurrentPacket());
  }

  setPacketName(name: string): void {
    this.store.dispatch(PacketPageAction.setCurrentPacketName({ name }));
  }

  setPacketLanguage(language: Language): void {
    this.store.dispatch(PacketPageAction.setPacketLanguage({ language }));
  }

  filterWords(query: string): void {
    this.query = query;
    this.pageNumber = 1;
    this.store.dispatch(
      WordPageAction.loadWords({ query, pageNumber: this.pageNumber })
    );
    this.words$ = this.store.select(getWords);
  }

  loadPageWords(): void {
    this.pageNumber++;
    this.store.dispatch(
      WordPageAction.loadWords({
        query: this.query,
        pageNumber: this.pageNumber,
      })
    );
  }

  private getAddedWordsIndexes(): Observable<number[]> {
    // TODO It doesn't look good. Think about it.
    return this.store.select(getWordsFromCurrentPacket).pipe(
      map((words) => {
        const indexes: number[] = [];
        if (words) {
          words.forEach((w) => indexes.push(w.id));
        }
        return indexes;
      })
    );
  }
}
