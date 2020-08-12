import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Result } from 'src/app/shared/models/result';

@Component({
  selector: 'app-last-result',
  templateUrl: './last-result.component.html',
  styleUrls: ['./last-result.component.scss'],
})
export class LastResultComponent {
  @Input()
  result: Result[];
  @Input()
  isLastResultMode: boolean;
  @Output()
  resultMode: EventEmitter<string> = new EventEmitter<string>();

  emitResultMode() {
    this.resultMode.emit();
  }
}
