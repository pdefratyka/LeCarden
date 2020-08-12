import { createAction, props } from '@ngrx/store';
import { Result } from 'src/app/shared/models/result';

export const loadResultSuccess = createAction(
  '[Result API] Load Result Success',
  props<{ result: Result[] }>()
);

export const loadResultFailure = createAction(
  '[Result API] Load Result Fail',
  props<{ error: string }>()
);
