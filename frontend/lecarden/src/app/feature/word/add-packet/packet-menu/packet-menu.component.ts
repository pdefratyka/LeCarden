import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Language } from 'src/app/shared/models/language';

@Component({
  selector: 'app-packet-menu',
  templateUrl: './packet-menu.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './packet-menu.component.scss',
  ],
})
export class PacketMenuComponent implements OnInit, OnDestroy {
  @Input()
  wordsInPacket: Word[];
  @Input()
  packetName: string;
  @Input()
  languages: Language[];
  @Output()
  removeWord: EventEmitter<Word> = new EventEmitter<Word>();
  @Output()
  savePacket: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  cancelPacket: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  setPacketName: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  setPacketLanguage: EventEmitter<Language> = new EventEmitter<Language>();
  addPacketForm: FormGroup;
  destroy$ = new Subject();
  packetLanguageDestroy$ = new Subject();

  constructor(private readonly formBuilder: FormBuilder) {
    this.initAddPacketForm();
  }
  ngOnDestroy(): void {
    this.destroy$.complete();
    this.packetLanguageDestroy$.complete();
  }
  ngOnInit(): void {
    this.addPacketForm
      .get('name')
      .get('packetName')
      .valueChanges.pipe(debounceTime(800), takeUntil(this.destroy$))
      .subscribe((name) => {
        this.setPacketName.emit(name);
      });
    this.addPacketForm
      .get('name')
      .get('language')
      .valueChanges.pipe(
        debounceTime(800),
        takeUntil(this.packetLanguageDestroy$)
      )
      .subscribe((value) => {
        this.setPacketLanguage.emit(this.selectMatchingLanguage(value));
      });
  }

  private initAddPacketForm(): void {
    this.addPacketForm = this.formBuilder.group({
      name: this.formBuilder.group({
        packetName: ['', [Validators.required]],
        language: [''],
      }),
    });
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

  clearForm(): void {
    const nameControllForm = this.addPacketForm.get('name').get('packetName');
    nameControllForm.setValue('');
    nameControllForm.markAsUntouched();
    this.emitCancelPacket();
  }

  emitRemoveWord(word: Word): void {
    this.removeWord.emit(word);
  }

  emitSavePacket(packetName: string): void {
    this.savePacket.emit(packetName);
  }

  emitCancelPacket(): void {
    this.cancelPacket.emit();
  }
}
