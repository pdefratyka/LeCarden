import { createAction, props } from '@ngrx/store';
import { Basket } from 'src/app/shared/models/basket';

export const loadBasketsForUser = createAction(
  '[Basket Page] Load Basket For User'
);

export const setBasketModeNumber = createAction(
  '[Basket Page] Set Current Basket',
  props<{ basket: Basket }>()
);
