import { Component, Input } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { Router } from '@angular/router';

@Component({
  selector: 'app-word-table',
  templateUrl: './word-table.component.html',
  styleUrls: ['./word-table.component.scss'],
})
export class WordTableComponent {
  @Input()
  words: Word[];

  constructor(private readonly router: Router) {}

  editWord(wordId: number): void {
    this.router.navigate(['/add-word/' + wordId]);
  }
}
