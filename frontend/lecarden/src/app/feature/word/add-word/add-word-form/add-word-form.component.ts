import { Component, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-word-form',
  templateUrl: './add-word-form.component.html',
  styleUrls: ['./add-word-form.component.scss']
})
export class AddWordFormComponent {
  @Output()
  saveWord: EventEmitter<Word> = new EventEmitter<Word>();
  formInvalidSubmitted = false;
  addWordForm: FormGroup;
  constructor(private readonly formBuilder: FormBuilder) {
    this.initAddWordForm();
  }

  emitSaveWord(): void {
    if (this.addWordForm.valid) {
      this.saveWord.emit({
        name: this.name.value,
        translation: this.translation.value,
        category: this.category.value,
        plural: this.plural.value
      } as Word);
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
      category: ['']
    });
  }

  get name() {
    return this.addWordForm.get('name');
  }

  get translation() {
    return this.addWordForm.get('translation');
  }

  get category() {
    return this.addWordForm.get('plural');
  }

  get plural() {
    return this.addWordForm.get('category');
  }
}
