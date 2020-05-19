import * as fromWords from '../actions/words.action';
import { Word } from 'src/app/shared/models/word';

export interface WordState {
  entities: { [id: number]: Word };
  loaded: boolean;
  loading: boolean;
}

export const initialState: WordState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromWords.WordsAction
): WordState {
  switch (action.type) {
    case fromWords.LOAD_WORDS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromWords.LOAD_WORDS_SUCCESS: {
      const words = action.payload;

      const entities = words.reduce(
        (entities: { [id: number]: Word }, word: Word) => {
          return {
            ...entities,
            [word.id]: word,
          };
        },
        {
          ...state.entities,
        }
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case fromWords.LOAD_WORDS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }
  return state;
}

export const getWordsEntities = (state: WordState) => state.entities;
export const getWordsLoading = (state: WordState) => state.loading;
export const getWordsLoaded = (state: WordState) => state.loaded;
