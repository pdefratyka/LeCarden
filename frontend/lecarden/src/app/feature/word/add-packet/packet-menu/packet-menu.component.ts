import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-packet-menu',
  templateUrl: './packet-menu.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './packet-menu.component.scss'
  ]
})
export class PacketMenuComponent {
  @Input()
  wordsInPacket: Word[];
  @Output()
  removeWord: EventEmitter<Word> = new EventEmitter<Word>();
  @Output()
  savePacket: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  cancelPacket: EventEmitter<void> = new EventEmitter<void>();
  addPacketForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.initAddPacketForm();
  }

  private initAddPacketForm(): void {
    this.addPacketForm = this.formBuilder.group({
      name: this.formBuilder.group({
        packetName: ['', [Validators.required]]
      })
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
