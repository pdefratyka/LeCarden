import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-learning-result',
  templateUrl: './learning-result.component.html',
  styleUrls: [
    './learning-result.component.scss',
    './../../../../shared/styles/global.scss',
  ],
})
export class LearningResultComponent {
  @Input()
  numberOfGoodAnswers: number;
  @Input()
  packetSize: number;
}
