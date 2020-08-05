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
import { Subject } from 'rxjs';

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
  @Output()
  removeWord: EventEmitter<Word> = new EventEmitter<Word>();
  @Output()
  savePacket: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  cancelPacket: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  setPacketName: EventEmitter<string> = new EventEmitter<string>();
  addPacketForm: FormGroup;
  destroy$ = new Subject();

  constructor(private readonly formBuilder: FormBuilder) {
    this.initAddPacketForm();
  }
  ngOnDestroy(): void {
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.addPacketForm
      .get('name')
      .get('packetName')
      .valueChanges.pipe(debounceTime(800), takeUntil(this.destroy$))
      .subscribe((name) => {
        this.setPacketName.emit(name);
      });
  }

  private initAddPacketForm(): void {
    this.addPacketForm = this.formBuilder.group({
      name: this.formBuilder.group({
        packetName: ['', [Validators.required]],
      }),
    });
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
