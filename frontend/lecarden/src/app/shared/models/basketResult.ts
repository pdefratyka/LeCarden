import { Basket } from './basket';
import { WordResult } from './wordResult';

export interface BasketResult {
  basket: Basket;
  wordResults: WordResult[];
  isFinalBasketMode: boolean;
}
