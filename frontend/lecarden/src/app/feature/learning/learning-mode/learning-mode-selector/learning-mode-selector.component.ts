import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LearningMode } from 'src/app/shared/models/learningMode';

@Component({
  selector: 'app-learning-mode-selector',
  templateUrl: './learning-mode-selector.component.html',
  styleUrls: ['./learning-mode-selector.component.scss'],
})
export class LearningModeSelectorComponent {
  @Input()
  selectedMode: LearningMode;
  @Output()
  selectMode: EventEmitter<LearningMode> = new EventEmitter<LearningMode>();

  emitSelectMode(mode: string): void {
    if (mode === 'foreginToKnown') {
      this.selectMode.emit(LearningMode.FOREGIN_TO_KNOWN);
    } else {
      this.selectMode.emit(LearningMode.KNOWN_TO_FOREGIN);
    }
  }

  isModeSelected(mode: string): boolean {
    return this.convertStringToMode(mode) === this.selectedMode;
  }

  private convertStringToMode(mode: string): LearningMode {
    if (mode === 'foreginToKnown') {
      return LearningMode.FOREGIN_TO_KNOWN;
    } else if (mode === 'knownToForegin') {
      return LearningMode.KNOWN_TO_FOREGIN;
    }
    return null;
  }
}
