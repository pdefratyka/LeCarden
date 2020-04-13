import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.scss'],
})
export class ExaminationComponent implements OnInit {
  @Input()
  word: string;
  @Output()
  answer: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  emitAnswer(answer: string): void {
    this.answer.emit(answer);
  }
}
