import { Word } from './word';

export interface Packet {
  id?: number;
  name: string;
  userId?: number;
  builtIn?: boolean;
  words: Word[]; // TODO Maybe it would be better to store only ids
}
