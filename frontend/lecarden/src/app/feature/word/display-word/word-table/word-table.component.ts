import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private readonly router: Router) {}

  editWord(wordId: number): void {
    this.router.navigate(['/add-word/' + wordId]);
  }
}
