import { Component } from '@angular/core';
import { WordService } from 'src/app/core/services/api/word.service';
import { Word } from 'src/app/shared/models/word';
import { take } from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message';
import { MessageType } from 'src/app/shared/models/messageTypes';
import { TokenService } from 'src/app/core/services/security/token.service';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './add-word.component.scss'
  ]
})
export class AddWordComponent {
  message: Message = new Message();
  constructor(private readonly wordService: WordService) {}

  saveWord(word: Word): void {
    this.wordService
      .saveWord(word)
      .pipe(take(1))
      .subscribe(
        () => {
          this.showConfirmation(word.name); // Success
        },
        () => this.showError() // Error handling
      );
  }

  private showError(): void {
    this.message = new Message();
    this.message.setMessageType(MessageType.ERROR);
    this.message.setMessage('ERROR');
  }

  private showConfirmation(word: string): void {
    this.message = new Message();
    this.message.setMessageType(MessageType.SUCCESS);
    this.message.setMessage(`Word: ${word} has been saved`);
  }
}
