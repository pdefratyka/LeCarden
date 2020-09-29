import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Language } from 'src/app/shared/models/language';

@Component({
  selector: 'app-add-word-form',
  templateUrl: './add-word-form.component.html',
  styleUrls: ['./add-word-form.component.scss'],
})
export class AddWordFormComponent implements OnChanges {
  @Output()
  saveWord: EventEmitter<Word> = new EventEmitter<Word>();
  @Output()
  clearWord: EventEmitter<void> = new EventEmitter<void>();
  @Input()
  categories: string[];
  @Input()
  word: Word;
  @Input()
  languages: Language[];
  formInvalidSubmitted = false;
  addWordForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.initAddWordForm();
  }

  ngOnChanges(): void {
    this.setValuesOnForm();
  }

  emitClearWord(): void {
    this.clearWord.emit();
    this.initAddWordForm();
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
          audioUrl: this.audioUrl.value,
          languageId: this.selectMatchingLanguage(this.language.value)?.id,
        } as Word);
        this.addWordForm.reset();
      }
      this.formInvalidSubmitted = false;
    } else {
      this.formInvalidSubmitted = true;
    }
  }

  private selectMatchingLanguage(languageOption: string): Language {
    if (languageOption) {
      const arr = languageOption.split('/');
      const lan = this.languages.find(
        (l) => l.foreignLanguage === arr[0] && l.knownLanguage === arr[1]
      );
      return lan;
    }
    return null;
  }

  private initAddWordForm(): void {
    console.log('init');
    this.addWordForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      translation: ['', [Validators.required]],
      plural: [''],
      category: [''],
      imageUrl: [''],
      audioUrl: [''],
      language: [''],
    });
  }

  private emitWordInEditMode(): void {
    console.log(this.addWordForm.get('language'));
    this.saveWord.emit({
      id: this.word.id,
      name: this.name.value,
      translation: this.translation.value,
      category: this.category.value,
      plural: this.plural.value,
      imageUrl: this.imageUrl.value,
      audioUrl: this.audioUrl.value,
      languageId: this.selectMatchingLanguage(this.language.value)?.id,
    } as Word);
  }

  private setValuesOnForm() {
    if (this.word) {
      const language = this.languages.find(
        (l) => l.id === this.word.languageId
      );
      console.log(language);
      this.addWordForm.get('name').setValue(this.word.name);
      this.addWordForm.get('translation').setValue(this.word.translation);
      this.addWordForm.get('category').setValue(this.word.category);
      this.addWordForm.get('plural').setValue(this.word.plural);
      this.addWordForm.get('imageUrl').setValue(this.word.imageUrl);
      this.addWordForm.get('audioUrl').setValue(this.word.audioUrl);
      this.addWordForm
        .get('language')
        .setValue(`${language.foreignLanguage}/${language.knownLanguage}`);
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

  get audioUrl() {
    return this.addWordForm.get('audioUrl');
  }

  get language() {
    return this.addWordForm.get('language');
  }
}
