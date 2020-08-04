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
