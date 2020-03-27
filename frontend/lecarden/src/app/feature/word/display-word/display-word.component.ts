import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { take, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from 'src/app/core/services/helpers/filter.service';

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
    private readonly filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.getWordsFromResolver();
  }

  filterWords(filter: string): void {
    this.filteredWords = this.filterService.filterWords(this.words, filter);
  }

  private getWordsFromResolver(): void {
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
}
