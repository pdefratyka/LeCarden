import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-packet-button-panel',
  templateUrl: './add-packet-button-panel.component.html',
  styleUrls: ['./add-packet-button-panel.component.scss'],
})
export class AddPacketButtonPanelComponent {
  @Input()
  addPacketForm: FormGroup;
  @Output()
  clearForm = new EventEmitter<void>();
  @Output()
  savePacket = new EventEmitter<string>();

  constructor() {}

  handleCancelButton(): void {
    this.clearForm.emit();
  }

  emitSavePacket(): void {
    this.savePacket.emit(
      this.addPacketForm.get('name').get('packetName').value
    );
  }
}
