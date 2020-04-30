import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Result } from 'src/app/shared/models/result';
import { WordResult } from 'src/app/shared/models/wordResult';

@Component({
  selector: 'app-last-result',
  templateUrl: './last-result.component.html',
  styleUrls: ['./last-result.component.scss'],
})
export class LastResultComponent implements OnInit {
  @Input()
  result: Result;
  @Output()
  resultMode: EventEmitter<string> = new EventEmitter<string>();
  numberOfWrongWords: number;
  constructor() {}

  ngOnInit(): void {
    this.numberOfWrongWords = this.filterWords(1).length;
  }

  emitResultMode() {
    this.resultMode.emit('lastResultMode');
  }

  private filterWords(attempts: number): WordResult[] {
    return this.result.wordsResultsTOs.filter((w) => w.attempts > attempts);
  }
}
