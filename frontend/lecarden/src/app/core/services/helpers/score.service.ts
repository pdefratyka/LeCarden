import { Injectable } from '@angular/core';
import { Statistic } from 'src/app/shared/models/statistic';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  getScore(numberOfAttempts: number, numberOfGoodAnswers: number): number {
    if (numberOfAttempts > 0) {
      return (numberOfGoodAnswers * 100) / numberOfAttempts;
    }
    return 0;
  }

  getScoreFromLastRound(statistic: Statistic) {
    let result = statistic.numberOfGoodAnswers;
    for (const score of statistic.scoreAfterRound) {
      result -= score;
    }
    return result;
  }
}
