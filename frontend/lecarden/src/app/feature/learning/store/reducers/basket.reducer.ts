import { Basket } from 'src/app/shared/models/basket';
import { createReducer, on } from '@ngrx/store';
import { BasketApiAction } from '../actions';

export interface BasketState {
  baskets: Basket[];
  error: string;
}

export const initialState: BasketState = {
  baskets: [],
  error: '',
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
  )
);
