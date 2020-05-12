import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-learning-result',
  templateUrl: './learning-result.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './learning-result.component.scss',
  ],
})
export class LearningResultComponent {
  @Input()
  numberOfGoodAnswers: number;
  @Input()
  packetSize: number;
}
