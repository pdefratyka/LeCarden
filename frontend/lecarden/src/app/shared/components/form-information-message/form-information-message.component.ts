import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-information-message',
  templateUrl: './form-information-message.component.html',
  styleUrls: ['./form-information-message.component.scss'],
})
export class FormInformationMessageComponent {
  @Input()
  message: string;
}
