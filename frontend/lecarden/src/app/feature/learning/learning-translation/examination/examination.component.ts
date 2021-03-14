import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LanguageWayLearningMode } from 'src/app/shared/models/languageWayLearningMode';
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
  learningMode: LanguageWayLearningMode;
  @Output()
  answer: EventEmitter<string> = new EventEmitter<string>();
  keyToAdd: Subject<string>;
  wordName: string;
  emitAnswer(answer: string): void {
    this.answer.emit(answer);
  }
  ngOnInit(): void {
    if (this.learningMode === LanguageWayLearningMode.KNOWN_TO_FOREIGN) {
      this.wordName = this.word.name;
    } else {
      this.wordName = this.word.translation;
    }
    this.keyToAdd = new Subject<string>();
  }

  addKeyToAnswer(key: string): void {
    this.keyToAdd.next(key);
  }
}
