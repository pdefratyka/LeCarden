import { WordResult } from './wordResult';
import { LanguageWayLearningMode } from './languageWayLearningMode';

export interface Result {
  id?: number;
  userId?: number;
  packetId?: number;
  score?: number;
  date?: Date;
  learningMode?: LanguageWayLearningMode;
  wordsResultsTOs?: WordResult[];
}
