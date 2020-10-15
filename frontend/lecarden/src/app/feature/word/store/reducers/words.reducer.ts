import { WordApiAction, WordPageAction } from '../actions/';
import { Word } from 'src/app/shared/models/word';
import { createReducer, on } from '@ngrx/store';

export interface WordState {
  words: Word[];
  currentWord: Word;
}

export const initialState: WordState = {
  words: [],
  currentWord: null,
};

export const wordReducer = createReducer<WordState>(
  initialState,
  on(
    WordApiAction.loadWordsSuccess,
    (state, action): WordState => {
      if (action.isNewQuery) {
        return {
          ...state,
          words: action.words,
        };
      }
      const wordsToAdd = [];
      action.words.forEach((w) => {
        if (!state.words.find((sw) => sw.id === w.id)) {
          wordsToAdd.push(w);
        }
      });
      return {
        ...state,
        words: [...state.words, ...wordsToAdd],
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
      if (action.word.id) {
        const index = state.words.findIndex((w) => w.id === action.word.id);
        state.words.splice(index, 1);
      }

      return {
        ...state,
        words: [...state.words, action.word],
        currentWord: null,
      };
    }
  ),
  on(
    WordApiAction.updateWordSuccess,
    (state, action): WordState => {
      console.log('Update word success');
      state.words.splice(action.word.id, 1);
      return {
        ...state,
        words: [...state.words, action.word],
        currentWord: null,
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
  ),
  on(
    WordApiAction.deleteWordSuccess,
    (state, action): WordState => {
      return {
        ...state,
        words: state.words.filter((word) => word.id !== action.wordId),
      };
    }
  ),
  on(
    WordPageAction.editWord,
    (state, action): WordState => {
      return {
        ...state,
        currentWord: action.word,
      };
    }
  ),
  on(
    WordPageAction.clearCurrentWord,
    (state, action): WordState => {
      return {
        ...state,
        currentWord: null,
      };
    }
  )
);
