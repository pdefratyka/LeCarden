import { BasketWord } from './basketWord';

export interface Basket {
  id?: number;
  number?: number;
  userId?: number;
  packetId?: number;
  basketWords?: BasketWord[];
}
