import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LearningMode } from 'src/app/shared/models/learningMode';
import { Word } from 'src/app/shared/models/word';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.scss'],
})
export class ExaminationComponent implements OnInit {
  @Input()
  word: Word;
  @Input()
  learningMode: LearningMode;
  @Output()
  answer: EventEmitter<string> = new EventEmitter<string>();
  wordName: string;
  emitAnswer(answer: string): void {
    this.answer.emit(answer);
  }
  ngOnInit(): void {
    if (this.learningMode === LearningMode.KNOWN_TO_FOREIGN) {
      this.wordName = this.word.name;
    } else {
      this.wordName = this.word.translation;
    }
  }
}
