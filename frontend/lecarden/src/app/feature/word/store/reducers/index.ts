import { WordState } from './words.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PacketState } from './packets.reducer';
import { LanguageState } from './languages.reducer';
import { CategoryState } from './categories.reducer';
import { Language } from 'src/app/shared/models/language';

export interface WordsState {
  words: WordState;
}

export interface PacketsState {
  packets: PacketState;
}

export interface LanguagesState {
  languages: LanguageState;
}

export interface CategoriesState {
  categories: CategoryState;
}

const getWordFeatureState = createFeatureSelector<WordState>('words');
const getPacketFeautreState = createFeatureSelector<PacketState>('packets');
const getLanguagesFeatureState =
  createFeatureSelector<LanguageState>('languages');
const getCategoriesFeatureState =
  createFeatureSelector<CategoryState>('categories');

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
  (state) => {
    return state.currentPacket.words;
  }
);

export const getCurrentPacketLanguage = createSelector(
  getPacketFeautreState,
  (state) => {
    return state.currentPacket.languageTO;
  }
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

export const getPacketFilterSearch = createSelector(
  getPacketFeautreState,
  (state) => state.filter.packetName
);

export const getPacketFilterLanguage = createSelector(
  getPacketFeautreState,
  (state) => state.filter.language
);

export const getPackets = createSelector(
  getPacketFeautreState,
  (state) => state.packets
);

export const getPacketsByFilters = createSelector(
  getPacketFeautreState,
  (state) =>
    state.packets.filter(
      (p) =>
        p.name.includes(state.filter.packetName) &&
        (!state.filter.language?.foreignLanguage ||
          !state.filter.language?.knownLanguage ||
          (p.languageTO &&
            p.languageTO.foreignLanguage ===
              state.filter.language.foreignLanguage &&
            p.languageTO.knownLanguage === state.filter.language.knownLanguage))
    )
);

export const getLanguages = createSelector(
  getLanguagesFeatureState,
  (state) => state.languages
);

export const getCategories = createSelector(
  getCategoriesFeatureState,
  (state) => state.categories
);

function parseLanguageToString(language: Language): string {
  if (language) {
    return `${language.foreignLanguage}/${language.knownLanguage}`;
  }
  return '';
}
