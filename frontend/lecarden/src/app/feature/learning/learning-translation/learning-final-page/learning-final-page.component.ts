import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-learning-final-page',
  templateUrl: './learning-final-page.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './learning-final-page.component.scss',
  ],
})
export class LearningFinalPageComponent {
  @Output()
  saveScore: EventEmitter<void> = new EventEmitter<void>();

  emitSaveScore(): void {
    this.saveScore.emit();
  }
}
