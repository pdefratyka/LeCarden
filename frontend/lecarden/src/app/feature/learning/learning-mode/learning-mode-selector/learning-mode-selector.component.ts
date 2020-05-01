import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LearningMode } from 'src/app/shared/models/learningMode';

@Component({
  selector: 'app-learning-mode-selector',
  templateUrl: './learning-mode-selector.component.html',
  styleUrls: ['./learning-mode-selector.component.scss'],
})
export class LearningModeSelectorComponent {
  LearningMode = LearningMode;
  @Input()
  selectedMode: LearningMode;
  @Output()
  selectMode: EventEmitter<LearningMode> = new EventEmitter<LearningMode>();

  emitSelectMode(mode: LearningMode): void {
    this.selectedMode = mode;
  }

  isModeSelected(mode: LearningMode): boolean {
    return this.selectedMode === mode;
  }
}
