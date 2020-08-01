import { WordState } from './words.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface WordsState {
  words: WordState;
}

const getWordFeatureState = createFeatureSelector<WordState>('words');

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
