import { WordState } from './words.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PacketState } from './packets.reducer';

export interface WordsState {
  words: WordState;
}

export interface PacketsState {
  packets: PacketState;
}

const getWordFeatureState = createFeatureSelector<WordState>('words');
const getPacketFeautreState = createFeatureSelector<PacketState>('packets');

export const getWords = createSelector(
  getWordFeatureState,
  (state) => state.words
);

export const getWordsFromCurrentPacket = createSelector(
  getPacketFeautreState,
  (state) => state.currentPacket.words
);

export const getWordsIdsFromCurrentPacket = createSelector(
  getWordsFromCurrentPacket,
  (state) => {
    const indexes: number[] = [];
    state.forEach((w) => indexes.push(w.id));
    return indexes;
  }
);

export const getCurrentPacket = createSelector(
  getPacketFeautreState,
  (state) => state.currentPacket
);

export const getCurrentPacketName = createSelector(
  getPacketFeautreState,
  getCurrentPacket,
  (state) => state.currentPacket.name
);

export const getCategories = createSelector(
  getWordFeatureState,
  getWords,
  (state) =>
    state.words
      .map((w) => w.category)
      .filter((value, index, self) => self.indexOf(value) === index)
);

export const getPackets = createSelector(
  getPacketFeautreState,
  (state) => state.packets
);
