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
import { LanguageHelperService } from 'src/app/core/services/helpers/language-helper.service';

@Component({
  selector: 'app-add-word-form',
  templateUrl: './add-word-form.component.html',
  styleUrls: ['./add-word-form.component.scss'],
})
export class AddWordFormComponent implements OnChanges {
  @Input()
  categories: string[];
  @Input()
  word: Word;
  @Input()
  languages: Language[];
  @Output()
  saveWord: EventEmitter<Word> = new EventEmitter<Word>();
  @Output()
  clearWord: EventEmitter<void> = new EventEmitter<void>();

  formInvalidSubmitted = false;
  addWordForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly languageHelperService: LanguageHelperService
  ) {
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
      this.saveWord.emit(this.initWord());
      this.addWordForm.reset();
      this.formInvalidSubmitted = false;
    } else {
      this.formInvalidSubmitted = true;
    }
  }

  private initAddWordForm(): void {
    this.addWordForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(45)]],
      translation: ['', [Validators.required, Validators.maxLength(45)]],
      plural: ['', Validators.maxLength(45)],
      category: ['', Validators.maxLength(45)],
      imageUrl: ['', Validators.maxLength(240)],
      audioUrl: ['', Validators.maxLength(240)],
      language: [''],
      example: ['', Validators.maxLength(240)],
    });
  }

  private initWord(): Word {
    return {
      id: this.word?.id ? this.word.id : undefined,
      name: this.name.value,
      translation: this.translation.value,
      category: this.category.value,
      plural: this.plural.value,
      imageUrl: this.imageUrl.value,
      audioUrl: this.audioUrl.value,
      languageId: this.languageHelperService.selectMatchingLanguage(
        this.languages,
        this.language.value
      )?.id,
      example: this.example.value,
    } as Word;
  }

  private setValuesOnForm() {
    if (this.word) {
      const language = this.languages.find(
        (l) => l.id === this.word.languageId
      );

      this.name.setValue(this.word.name);
      this.translation.setValue(this.word.translation);
      this.category.setValue(this.word.category);
      this.plural.setValue(this.word.plural);
      this.imageUrl.setValue(this.word.imageUrl);
      this.audioUrl.setValue(this.word.audioUrl);
      this.example.setValue(this.word.example);
      if (language) {
        this.language.setValue(
          `${language.foreignLanguage}/${language.knownLanguage}`
        );
      }
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
  get example() {
    return this.addWordForm.get('example');
  }
}
