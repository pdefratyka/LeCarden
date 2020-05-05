import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-word-form',
  templateUrl: './add-word-form.component.html',
  styleUrls: ['./add-word-form.component.scss'],
})
export class AddWordFormComponent implements OnChanges {
  @Output()
  saveWord: EventEmitter<Word> = new EventEmitter<Word>();
  @Input()
  categories: string[];
  @Input()
  word: Word;
  formInvalidSubmitted = false;
  addWordForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.initAddWordForm();
  }

  ngOnChanges(): void {
    this.setValuesOnForm();
  }

  emitSaveWord(): void {
    if (this.addWordForm.valid) {
      if (this.word) {
        this.emitWordInEditMode();
      } else {
        this.saveWord.emit({
          name: this.name.value,
          translation: this.translation.value,
          category: this.category.value,
          plural: this.plural.value,
          imageUrl: this.imageUrl.value,
        } as Word);
      }

      this.formInvalidSubmitted = false;
      this.addWordForm.reset();
    } else {
      this.formInvalidSubmitted = true;
    }
  }

  private initAddWordForm(): void {
    this.addWordForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      translation: ['', [Validators.required]],
      plural: [''],
      category: [''],
      imageUrl: [''],
    });
  }

  private emitWordInEditMode(): void {
    this.saveWord.emit({
      id: this.word.id,
      name: this.name.value,
      translation: this.translation.value,
      category: this.category.value,
      plural: this.plural.value,
      imageUrl: this.imageUrl.value,
    } as Word);
  }

  private setValuesOnForm() {
    if (this.word) {
      this.addWordForm.get('name').setValue(this.word.name);
      this.addWordForm.get('translation').setValue(this.word.translation);
      this.addWordForm.get('category').setValue(this.word.category);
      this.addWordForm.get('plural').setValue(this.word.plural);
      this.addWordForm.get('imageUrl').setValue(this.word.imageUrl);
    }
  }

  get name() {
    return this.addWordForm.get('name');
  }

  get translation() {
    return this.addWordForm.get('translation');
  }

  get category() {
    return this.addWordForm.get('category');
  }

  get plural() {
    return this.addWordForm.get('plural');
  }

  get imageUrl() {
    return this.addWordForm.get('imageUrl');
  }
}
