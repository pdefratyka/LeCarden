import { Basket } from 'src/app/shared/models/basket';
import { createReducer, on } from '@ngrx/store';
import { BasketApiAction, BasketPageAction } from '../actions';

export interface BasketState {
  baskets: Basket[];
  error: string;
  currentBasket: Basket;
}

export const initialState: BasketState = {
  baskets: [],
  error: '',
  currentBasket: null,
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
        currentBasket: action.basket,
      };
    }
  ),
  on(
    BasketApiAction.resetBasketsSuccess,
    (state, action): BasketState => {
      const tempBaskets = state.baskets.filter(
        (b) => b.packetId !== action.packetId
      );
      return {
        ...state,
        baskets: tempBaskets,
      };
    }
  )
);
