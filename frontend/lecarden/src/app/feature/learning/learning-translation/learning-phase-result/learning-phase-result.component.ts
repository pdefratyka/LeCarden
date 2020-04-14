import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-learning-phase-result',
  templateUrl: './learning-phase-result.component.html',
  styleUrls: [
    './learning-phase-result.component.scss',
    './../../../../shared/styles/global.scss',
  ],
})
export class LearningPhaseResultComponent {
  @Input()
  scores: number[];
  @Input()
  packetSize: number;

  getPacketForResult(result: number): number {
    let packetResultSize = this.packetSize;
    for (let i = 0; i < result; i++) {
      packetResultSize -= this.scores[i];
    }
    return packetResultSize;
  }
}
