import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Answer } from 'src/app/shared/models/answer';
import { Word } from 'src/app/shared/models/word';

@Component({
  selector: 'app-response-to-answer',
  templateUrl: './response-to-answer.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './response-to-answer.component.scss',
  ],
})
export class ResponseToAnswerComponent implements AfterViewInit {
  @ViewChild('submitButton')
  submitButton: ElementRef;
  @Input()
  answer: Answer;
  @Output()
  continue: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  updateWord: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  saveWord: EventEmitter<Word> = new EventEmitter<Word>();
  @Output()
  closeForm: EventEmitter<Word> = new EventEmitter<Word>();
  @Input()
  word: Word;
  answerForm: FormGroup;
  formInvalidSubmitted = false;
  addWordForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.initAnswerForm();
    this.initAddWordForm();
  }

  ngAfterViewInit(): void {
    this.submitButton.nativeElement.focus();
  }

  emitContinue(): void {
    this.continue.emit();
  }

  emitUpdateWord(): void {
    this.updateWord.emit();
  }

  private initAnswerForm(): void {
    this.answerForm = this.formBuilder.group({});
  }

  ngOnChanges(): void {
    this.setValuesOnForm();
  }

  emitSaveWord(): void {
    console.log('SAVE');
    if (this.addWordForm.valid) {
      if (this.word && this.word.id) {
        this.emitWordInEditMode();
      }

      this.formInvalidSubmitted = false;
    } else {
      this.formInvalidSubmitted = true;
    }
  }

  emitCloseForm(): void {
    this.closeForm.emit();
  }
  private initAddWordForm(): void {
    this.addWordForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      translation: ['', [Validators.required]],
      plural: [''],
      imageUrl: [''],
      audioUrl: [''],
      example: [''],
    });
  }

  private emitWordInEditMode(): void {
    this.saveWord.emit({
      id: this.word.id,
      name: this.name.value,
      category: this.word.category,
      translation: this.translation.value,
      plural: this.plural.value,
      imageUrl: this.imageUrl.value,
      audioUrl: this.audioUrl.value,
      example: this.example.value,
      userId: this.word.userId,
      builtIn: this.word.builtIn,
    } as Word);
  }

  private setValuesOnForm() {
    if (this.word) {
      this.addWordForm.get('name').setValue(this.word.name);
      this.addWordForm.get('translation').setValue(this.word.translation);
      this.addWordForm.get('plural').setValue(this.word.plural);
      this.addWordForm.get('imageUrl').setValue(this.word.imageUrl);
      this.addWordForm.get('audioUrl').setValue(this.word.audioUrl);
      this.addWordForm.get('example').setValue(this.word.example);
    }
  }

  get name() {
    return this.addWordForm.get('name');
  }

  get translation() {
    return this.addWordForm.get('translation');
  }

  get plural() {
    return this.addWordForm.get('plural');
  }

  get imageUrl() {
    return this.addWordForm.get('imageUrl');
  }

  get audioUrl() {
    return this.addWordForm.get('audioUrl');
  }

  get example() {
    return this.addWordForm.get('example');
  }
}
