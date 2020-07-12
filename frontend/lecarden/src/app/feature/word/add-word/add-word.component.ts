import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/core/services/api/word.service';
import { Word } from 'src/app/shared/models/word';
import { take, map, throwIfEmpty } from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message';
import { MessageType } from 'src/app/shared/models/messageTypes';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './add-word.component.scss',
  ],
})
export class AddWordComponent implements OnInit {
  message: Message = new Message();
  categories: string[];
  word: Word;
  constructor(
    private readonly wordService: WordService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getCategoriesFromResolver();
    this.getWordFromResolver();
  }

  saveWord(word: Word): void {
    this.wordService
      .saveWord(word)
      .pipe(take(1))
      .subscribe(
        () => {
          if (word.id != null) {
            this.router.navigate(['display-word']);
          } else {
            this.addCategoryIfNotNotPresentYet(word.category);
            this.showConfirmation(word.name);
          }
        },
        () => this.showError()
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

  private addCategoryIfNotNotPresentYet(category: string): void {
    if (!this.categories.includes(category)) {
      this.categories.push(category);
    }
  }

  private getCategoriesFromResolver(): void {
    this.route.data
      .pipe(
        map((data) => data.categories),
        take(1)
      )
      .subscribe((response) => (this.categories = response));
  }

  private getWordFromResolver(): void {
    this.route.data
      .pipe(
        map((data) => data.word),
        take(1)
      )
      .subscribe((val) => {
        if (val !== undefined) {
          this.word = val;
        }
      });
  }
}
