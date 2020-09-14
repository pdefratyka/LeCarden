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

export const updateBasketSuccess = createAction(
  '[Basket API] Update Basket Success',
  props<{ baskets: Basket[] }>()
);

export const updateBasketFailture = createAction(
  '[Basket API] Update Basket Failture',
  props<{ error: string }>()
);

export const resetBasketsSuccess = createAction(
  '[Basket API] Reset Baskets Success',
  props<{ packetId: number }>()
);

export const resetBasketsFailure = createAction(
  '[Basket API] Reset Baskets Failture',
  props<{ error: string }>()
);
