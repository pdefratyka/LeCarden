import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: [
    './score.component.scss',
    './../../../../shared/styles/global.scss',
  ],
})
export class ScoreComponent {
  @Input()
  numberOfGoodAnswers: number;
  @Input()
  numberOfAttempts: number;

  getScore(): number {
    if (this.numberOfAttempts > 0) {
      return (this.numberOfGoodAnswers * 100) / this.numberOfAttempts;
    }
    return 0;
  }
}
