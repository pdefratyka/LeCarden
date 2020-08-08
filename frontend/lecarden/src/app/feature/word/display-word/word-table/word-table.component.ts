import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-word-table',
  templateUrl: './word-table.component.html',
  styleUrls: ['./word-table.component.scss'],
})
export class WordTableComponent {
  @Input()
  words: Word[];
  @Output()
  deleteWord: EventEmitter<number> = new EventEmitter<number>();

  constructor(private readonly router: Router) {}
  // TODO Change to store
  editWord(wordId: number): void {
    this.router.navigate(['/add-word/' + wordId]);
  }

  emitDeleteWord(wordId: number, name: string): void {
    if (window.confirm(`Are you sure you want to delete word: ${name}`)) {
      this.deleteWord.emit(wordId);
    }
  }
}
