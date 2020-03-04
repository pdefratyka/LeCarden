import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  constructor() {}

  emitClearForm(): void {
    this.clearForm.emit();
  }
}
