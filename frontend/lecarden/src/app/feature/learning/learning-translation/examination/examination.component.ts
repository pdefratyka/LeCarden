import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.scss'],
})
export class ExaminationComponent {
  @Input()
  word: string;
  @Output()
  answer: EventEmitter<string> = new EventEmitter<string>();

  emitAnswer(answer: string): void {
    this.answer.emit(answer);
  }
}
