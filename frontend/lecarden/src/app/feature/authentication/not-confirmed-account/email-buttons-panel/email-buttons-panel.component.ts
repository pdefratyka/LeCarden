import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-email-buttons-panel',
  templateUrl: './email-buttons-panel.component.html',
  styleUrls: ['./email-buttons-panel.component.scss'],
})
export class EmailButtonsPanelComponent {
  @Output()
  sendEmail: EventEmitter<void> = new EventEmitter<void>();

  sendConfirmationEmail(): void {
    this.sendEmail.emit();
  }
}
