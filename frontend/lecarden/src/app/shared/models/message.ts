import { MessageType } from './messageTypes';

export class Message {
  private message: string;
  private messageType: MessageType;

  public setMessage(message: string) {
    this.message = message;
  }

  public setMessageType(messageType: MessageType) {
    this.messageType = messageType;
  }

  public getMessage(): string {
    return this.message;
  }

  public getMessageType(): MessageType {
    return this.messageType;
  }
}
