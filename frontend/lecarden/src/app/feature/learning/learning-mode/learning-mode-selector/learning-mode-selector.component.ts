import { Component, Output, EventEmitter, Input } from '@angular/core';
import { LanguageWayLearningMode } from 'src/app/shared/models/languageWayLearningMode';

@Component({
  selector: 'app-learning-mode-selector',
  templateUrl: './learning-mode-selector.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './learning-mode-selector.component.scss',
  ],
})
export class LearningModeSelectorComponent {
  LanguageWayLearningMode = LanguageWayLearningMode;
  @Input()
  selectedMode: LanguageWayLearningMode;
  @Output()
  selectMode: EventEmitter<LanguageWayLearningMode> = new EventEmitter<LanguageWayLearningMode>();

  emitSelectMode(mode: LanguageWayLearningMode): void {
    if (mode === this.selectedMode) {
      mode = null;
    }
    this.selectMode.emit(mode);
  }

  isModeSelected(mode: LanguageWayLearningMode): boolean {
    return this.selectedMode === mode;
  }
}
