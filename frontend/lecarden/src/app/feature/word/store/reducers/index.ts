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
