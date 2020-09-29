import { WordState } from './words.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PacketState } from './packets.reducer';
import { LanguageState } from './languages.reducer';

export interface WordsState {
  words: WordState;
}

export interface PacketsState {
  packets: PacketState;
}

export interface LanguagesState {
  languages: LanguageState;
}

const getWordFeatureState = createFeatureSelector<WordState>('words');
const getPacketFeautreState = createFeatureSelector<PacketState>('packets');
const getLanguagesFeatureState = createFeatureSelector<LanguageState>(
  'languages'
);

export const getWords = createSelector(
  getWordFeatureState,
  (state) => state.words
);

export const getCurrentWord = createSelector(
  getWordFeatureState,
  (state) => state.currentWord
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

export const getLanguages = createSelector(
  getLanguagesFeatureState,
  (state) => state.languages
);
