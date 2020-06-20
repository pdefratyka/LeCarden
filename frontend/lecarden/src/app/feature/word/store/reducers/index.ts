import * as fromWords from './words.reducer';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export interface WordsState {
  words: fromWords.WordState;
}

export const reducers: ActionReducerMap<WordsState> = {
  words: fromWords.reducer,
};

export const getWordsState = createFeatureSelector<WordsState>('words');

// words state
export const getWordState = createSelector(
  getWordsState,
  (state: WordsState) => state.words
);

export const getWordsEntities = createSelector(
  getWordState,
  fromWords.getWordsEntities
);

export const getAllWords = createSelector(getWordsEntities, (entities) => {
  return Object.keys(entities).map((id) => entities[id]);
});

export const getWordsLoaded = createSelector(
  getWordState,
  fromWords.getWordsLoaded
);

export const getWordsLoading = createSelector(
  getWordState,
  fromWords.getWordsLoading
);
