import { createAction, props } from '@ngrx/store';
import { Language } from 'src/app/shared/models/language';

export const loadLanguagesSuccess = createAction(
  '[Language API] Load Languages Success',
  props<{ languages: Language[] }>()
);

export const loadLanguagesFailure = createAction(
  '[Language API] Load Languages Fail',
  props<{ error: string }>()
);
