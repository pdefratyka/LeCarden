import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-learning-final-page',
  templateUrl: './learning-final-page.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './learning-final-page.component.scss',
  ],
})
export class LearningFinalPageComponent {
  @Input()
  isBasketMode: boolean;
  @Output()
  saveScore: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  changeFinalBasketMode: EventEmitter<void> = new EventEmitter<void>();

  emitSaveScore(): void {
    this.saveScore.emit();
  }

  emitFinalBasketMode(): void {
    this.changeFinalBasketMode.emit();
  }
}
