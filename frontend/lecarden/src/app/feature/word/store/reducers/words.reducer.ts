import { WordApiAction } from '../actions/';
import { Word } from 'src/app/shared/models/word';
import { createReducer, on } from '@ngrx/store';

export interface WordState {
  words: Word[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: WordState = {
  words: [],
  loaded: false,
  loading: false,
};

export const wordReducer = createReducer<WordState>(
  initialState,
  on(
    WordApiAction.loadWordsSuccess,
    (state, action): WordState => {
      return {
        ...state,
        words: action.words,
      };
    }
  ),
  on(
    WordApiAction.loadWordsFailure,
    (state, action): WordState => {
      return {
        ...state,
        words: [],
      };
    }
  ),
  on(
    WordApiAction.saveWordSuccess,
    (state, action): WordState => {
      return {
        ...state,
        words: [...state.words, action.word],
      };
    }
  ),
  on(
    WordApiAction.saveWordFailure,
    (state, action): WordState => {
      return {
        ...state,
      };
    }
  )
);
