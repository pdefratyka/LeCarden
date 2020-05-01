import { WordResult } from './wordResult';

export class Result {
  id: number;
  userId: number;
  packetId: number;
  score: number;
  date: Date;
  wordsResultsTOs: WordResult[];

  constructor(
    packetId?: number,
    userId?: number,
    wordsResultsTOs?: WordResult[]
  ) {
    if (packetId) {
      this.packetId = packetId;
    }
    if (userId) {
      this.userId = userId;
    }
    if (wordsResultsTOs) {
      this.wordsResultsTOs = wordsResultsTOs;
    }
  }
}
