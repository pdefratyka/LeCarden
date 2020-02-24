import { Component, OnInit, Input } from '@angular/core';
import { WordService } from 'src/app/core/services/api/word.service';
import { Word } from 'src/app/shared/models/word';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './add-word.component.scss'
  ]
})
export class AddWordComponent implements OnInit {
  constructor(private readonly wordService: WordService) {}

  ngOnInit() {}
  saveWord(word: Word): void {
    this.wordService
      .saveWord(word)
      .subscribe(response => console.log(response));
  }
}
