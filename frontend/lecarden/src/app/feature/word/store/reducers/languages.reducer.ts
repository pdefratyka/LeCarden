import { createReducer, on } from '@ngrx/store';
import { Language } from 'src/app/shared/models/language';
import { LanguageApiAction } from '../actions';

export interface LanguageState {
  languages: Language[];
}

export const initialState: LanguageState = {
  languages: [],
};

export const languageReducer = createReducer<LanguageState>(
  initialState,
  on(
    LanguageApiAction.loadLanguagesSuccess,
    (state, action): LanguageState => {
      return {
        ...state,
        languages: action.languages,
      };
    }
  )
);
