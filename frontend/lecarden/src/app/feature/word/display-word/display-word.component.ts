import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { take, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { WordHelperService } from 'src/app/core/services/helpers/word-helper.service';

@Component({
  selector: 'app-display-word',
  templateUrl: './display-word.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './display-word.component.scss'
  ]
})
export class DisplayWordComponent implements OnInit {
  words: Word[];
  filteredWords: Word[];
  constructor(
    private readonly route: ActivatedRoute,
    private readonly wordHelperService: WordHelperService
  ) {}
  ngOnInit(): void {
    this.route.data
      .pipe(
        map(data => data.words),
        take(1)
      )
      .subscribe(val => {
        this.words = val;
        this.filteredWords = val;
      });
  }

  filterWords(filter: string): void {
    this.filteredWords = this.wordHelperService.filterWords(this.words, filter);
  }
}
