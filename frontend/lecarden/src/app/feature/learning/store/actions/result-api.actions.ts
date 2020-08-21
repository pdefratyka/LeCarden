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

export const loadAllLastResultsForUserSeccuess = createAction(
  '[Result API] Load All Last Reesults Success',
  props<{ result: Result[] }>()
);

export const loadAllLastResultsForUserFailure = createAction(
  '[Result API] Load All Last Reesults Failure',
  props<{ error: string }>()
);
