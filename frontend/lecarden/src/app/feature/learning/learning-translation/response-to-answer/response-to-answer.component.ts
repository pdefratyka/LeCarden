import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Answer } from 'src/app/shared/models/answer';

@Component({
  selector: 'app-response-to-answer',
  templateUrl: './response-to-answer.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './response-to-answer.component.scss',
  ],
})
export class ResponseToAnswerComponent implements AfterViewInit {
  @ViewChild('submitButton', { static: false })
  submitButton: ElementRef;
  @Input()
  answer: Answer;
  @Output()
  continue: EventEmitter<void> = new EventEmitter<void>();
  answerForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.initAnswerForm();
  }

  ngAfterViewInit(): void {
    this.submitButton.nativeElement.focus();
  }

  emitContinue(): void {
    this.continue.emit();
  }

  private initAnswerForm(): void {
    this.answerForm = this.formBuilder.group({});
  }
}
