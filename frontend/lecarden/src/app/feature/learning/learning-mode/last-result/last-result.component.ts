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
  isLastResultModeSelected = false;
  constructor() {}

  ngOnInit(): void {
    console.log(this.result);
    this.numberOfWrongWords = this.filterWords(1).length;
  }

  emitResultMode() {
    this.resultMode.emit('lastResultMode');
    this.isLastResultModeSelected = !this.isLastResultModeSelected;
  }

  private filterWords(attempts: number): WordResult[] {
    return this.result.wordsResultsTOs.filter((w) => w.attempts > attempts);
  }
}
