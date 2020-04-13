import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-learning-mode-selector',
  templateUrl: './learning-mode-selector.component.html',
  styleUrls: ['./learning-mode-selector.component.scss']
})
export class LearningModeSelectorComponent {
  @Input()
  selectedMode: string;
  @Output()
  selectMode: EventEmitter<string> = new EventEmitter<string>();

  emitSelectMode(mode: string): void {
    this.selectMode.emit(mode);
  }
}
