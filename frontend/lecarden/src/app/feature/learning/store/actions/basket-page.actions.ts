import { createAction, props } from '@ngrx/store';
import { Basket } from 'src/app/shared/models/basket';
import { BasketResult } from 'src/app/shared/models/basketResult';

export const loadBasketsForUser = createAction(
  '[Basket Page] Load Basket For User'
);

export const setBasketModeNumber = createAction(
  '[Basket Page] Set Current Basket',
  props<{ basket: Basket }>()
);

export const updateBasket = createAction(
  '[Basket Page] Update Basket',
  props<{ basketResult: BasketResult }>()
);
