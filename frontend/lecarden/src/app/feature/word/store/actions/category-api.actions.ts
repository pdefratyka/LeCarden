import { createAction, props } from '@ngrx/store';

export const loadCategoriesSuccess = createAction(
  '[Categories API] Load Categories Success',
  props<{ categories: string[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories API] Load Categories Fail',
  props<{ error: string }>()
);
