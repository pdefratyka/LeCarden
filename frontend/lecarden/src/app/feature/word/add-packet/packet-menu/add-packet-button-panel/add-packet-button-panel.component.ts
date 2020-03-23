import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-packet-button-panel',
  templateUrl: './add-packet-button-panel.component.html',
  styleUrls: ['./add-packet-button-panel.component.scss']
})
export class AddPacketButtonPanelComponent {
  @Input()
  addPacketForm: FormGroup;
  @Output()
  clearForm = new EventEmitter<void>();
  @Output()
  savePacket = new EventEmitter<string>();

  constructor(private router: Router, private location: Location) {}

  handleCancelButton(): void {
    const regex = new RegExp('add-packet/');
    if (regex.test(this.router.url)) {
      this.location.back();
    } else {
      this.clearForm.emit();
    }
  }

  emitSavePacket(): void {
    this.savePacket.emit(
      this.addPacketForm.get('name').get('packetName').value
    );
  }
}
