import { BasketWord } from './basketWord';

export interface WordResult {
  wordId?: number;
  basketWord?: BasketWord;
  attempts: number;
}
