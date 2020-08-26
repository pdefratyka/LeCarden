import { WordResult } from './wordResult';
import { LearningMode } from './learningMode';

export interface Result {
  id?: number;
  userId?: number;
  packetId?: number;
  score?: number;
  date?: Date;
  learningMode?: LearningMode;
  wordsResultsTOs?: WordResult[];

  /*constructor(
    packetId?: number,
    userId?: number,
    learningMode?: LearningMode,
    wordsResultsTOs?: WordResult[]
  ) {
    this.packetId = packetId;
    this.userId = userId;
    this.wordsResultsTOs = wordsResultsTOs;
    this.learningMode = learningMode;
  }*/
}
