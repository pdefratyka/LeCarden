import { Component, Input } from '@angular/core';
import { ScoreService } from 'src/app/core/services/helpers/score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './score.component.scss',
  ],
})
export class ScoreComponent {
  @Input()
  numberOfGoodAnswers: number;
  @Input()
  numberOfAttempts: number;
  @Input()
  packetSize: number;

  constructor(private readonly scoreService: ScoreService) {}

  getScore(): number {
    return this.scoreService.getScore(
      this.numberOfAttempts,
      this.numberOfGoodAnswers
    );
  }
}
