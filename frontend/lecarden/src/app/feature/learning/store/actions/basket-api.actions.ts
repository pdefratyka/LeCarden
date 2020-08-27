import { createAction, props } from '@ngrx/store';
import { Basket } from 'src/app/shared/models/basket';
export const loadBasketsForUserSuccess = createAction(
  '[Basket API] Load Baskets Success',
  props<{ baskets: Basket[] }>()
);

export const loadBasketsForUserFailure = createAction(
  '[Basket API] Load Baskets Failure',
  props<{ error: string }>()
);
