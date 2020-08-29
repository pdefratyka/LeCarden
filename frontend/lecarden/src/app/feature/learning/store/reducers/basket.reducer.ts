import { Basket } from 'src/app/shared/models/basket';
import { createReducer, on } from '@ngrx/store';
import { BasketApiAction, BasketPageAction } from '../actions';

export interface BasketState {
  baskets: Basket[];
  error: string;
  basketModeNumber: number;
}

export const initialState: BasketState = {
  baskets: [],
  error: '',
  basketModeNumber: null,
};

export const basketReducer = createReducer<BasketState>(
  initialState,
  on(
    BasketApiAction.loadBasketsForUserSuccess,
    (state, action): BasketState => {
      return {
        ...state,
        baskets: action.baskets,
        error: '',
      };
    }
  ),
  on(
    BasketApiAction.loadBasketsForUserFailure,
    (state, action): BasketState => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),
  on(
    BasketPageAction.setBasketModeNumber,
    (state, action): BasketState => {
      return {
        ...state,
        basketModeNumber: action.basketNumber,
      };
    }
  )
);
