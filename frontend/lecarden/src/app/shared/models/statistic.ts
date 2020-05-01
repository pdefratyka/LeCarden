export class Statistic {
  numberOfGoodAnswers: number;
  numberOfAttempts: number;
  scoreAfterRound: number[];

  constructor(
    numberOfGoodAnswers: number,
    numberOfAttempts: number,
    scoreAfterRound: number[]
  ) {
    this.numberOfGoodAnswers = numberOfGoodAnswers;
    this.numberOfAttempts = numberOfAttempts;
    this.scoreAfterRound = scoreAfterRound;
  }
}
