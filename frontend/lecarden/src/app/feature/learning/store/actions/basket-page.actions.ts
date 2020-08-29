import { createAction, props } from '@ngrx/store';

export const loadBasketsForUser = createAction(
  '[Basket Page] Load Basket For User'
);

export const setBasketModeNumber = createAction(
  '[Basket Page] Set Basket Mode Number',
  props<{ basketNumber: number }>()
);
