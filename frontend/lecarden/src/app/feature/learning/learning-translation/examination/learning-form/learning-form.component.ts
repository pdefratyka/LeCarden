import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-learning-form',
  templateUrl: './learning-form.component.html',
  styleUrls: [
    './../../../../../shared/styles/global.scss',
    './learning-form.component.scss',
  ],
})
export class LearningFormComponent implements AfterViewInit {
  @ViewChild('answerInput')
  answerInput: ElementRef;
  @Input()
  word: string;
  @Output()
  answer: EventEmitter<string> = new EventEmitter<string>();
  learningForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.initLearningForm();
  }

  ngAfterViewInit(): void {
    this.answerInput.nativeElement.focus();
  }

  emitAnswer(): void {
    this.answer.emit(this.learningForm.get('answer').value);
    this.learningForm.get('answer').setValue('');
  }

  keyPress(event: KeyboardEvent): void {
    if (event.key === '1') {
      this.addLetterToAnswer(event, 'ü');
    } else if (event.key === '2') {
      this.addLetterToAnswer(event, 'ä');
    } else if (event.key === '3') {
      this.addLetterToAnswer(event, 'ß');
    } else if (event.key === '4') {
      this.addLetterToAnswer(event, 'ö');
    }
  }

  private initLearningForm(): void {
    this.learningForm = this.formBuilder.group({
      answer: ['', [Validators.required]],
    });
  }

  private addLetterToAnswer(event: KeyboardEvent, letter: string): void {
    event.preventDefault();
    this.learningForm
      .get('answer')
      .setValue(this.learningForm.get('answer').value + letter);
  }
}
