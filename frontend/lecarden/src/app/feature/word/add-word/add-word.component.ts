import { Component } from '@angular/core';
import { WordService } from 'src/app/core/services/api/word.service';
import { Word } from 'src/app/shared/models/word';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './add-word.component.scss'
  ]
})
export class AddWordComponent {
  wordHasBeenSaved = false;
  wordHasNotBeenSaved = false;
  constructor(private readonly wordService: WordService) {}

  saveWord(word: Word): void {
    const that = this;
    this.wordService
      .saveWord(word)
      .pipe(take(1))
      .subscribe(
        response => {
          console.log(response);
          that.showAddWordConfirmation();
        },
        () => this.showError() // Error handling
      );
  }

  private showAddWordConfirmation(): void {
    const displayTime = 4 * 1000;
    this.wordHasBeenSaved = true;
    const that = this;
    setTimeout(() => {
      that.wordHasBeenSaved = false;
      that.wordHasNotBeenSaved = false;
    }, displayTime);
  }

  private showError(): void {
    this.wordHasNotBeenSaved = true;
  }
}
