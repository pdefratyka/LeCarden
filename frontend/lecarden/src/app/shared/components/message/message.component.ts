import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { MessageType } from '../../models/messageTypes';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnChanges, OnInit {
  @Input()
  message: Message;
  constructor() {}

  ngOnInit(): void {
    if (this.message === undefined) {
      this.message = new Message();
    }
  }

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
