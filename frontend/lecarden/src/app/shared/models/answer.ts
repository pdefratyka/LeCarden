export class Answer {
  userAnswer: string;
  correctAnswer: string;
  isCorrectAnswer: boolean;

  constructor(userAnswer: string, correctAnswer: string, isCorrectAnswer) {
    this.userAnswer = userAnswer;
    this.correctAnswer = correctAnswer;
    this.isCorrectAnswer = isCorrectAnswer;
  }
}
