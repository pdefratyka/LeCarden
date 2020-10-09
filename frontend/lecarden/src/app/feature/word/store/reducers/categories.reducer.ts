import { createReducer, on } from '@ngrx/store';
import { CategoryApiAction } from '../actions';

export interface CategoryState {
  categories: string[];
}

export const initialState: CategoryState = {
  categories: [],
};

export const categoryReducer = createReducer<CategoryState>(
  initialState,
  on(
    CategoryApiAction.loadCategoriesSuccess,
    (state, action): CategoryState => {
      return {
        ...state,
        categories: action.categories,
      };
    }
  )
);
