import { WordResult } from './wordResult';

export class Result {
  id: number;
  userId: number;
  packetId: number;
  score: number;
  wordsResultsTOs: WordResult[];
}
