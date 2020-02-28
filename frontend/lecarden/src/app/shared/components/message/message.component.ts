import { Component, Input, OnChanges } from '@angular/core';
import { Message } from '../../models/message';
import { MessageType } from '../../models/messageTypes';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnChanges {
  @Input()
  message: Message;
  constructor() {}

  ngOnChanges(): void {
    const that = this;
    setTimeout(() => {
      that.message.setMessage('');
    }, 4 * 1000);
  }

  errorMessage(): boolean {
    return this.message.getMessageType() === MessageType.ERROR;
  }

  successMessage(): boolean {
    return this.message.getMessageType() === MessageType.SUCCESS;
  }
}
