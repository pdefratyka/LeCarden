import { createReducer, on } from '@ngrx/store';
import { ResultApiAction } from '../actions';
import { Result } from 'src/app/shared/models/result';

export interface ResultState {
  results: Result[];
  error: string;
}

export const initialState: ResultState = {
  results: [],
  error: '',
};

export const resultReducer = createReducer<ResultState>(
  initialState,
  on(
    ResultApiAction.loadResultSuccess,
    (state, action): ResultState => {
      return {
        ...state,
        results: [...state.results, ...action.result],
        error: '',
      };
    }
  ),
  on(
    ResultApiAction.loadResultFailure,
    (state, action): ResultState => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);
