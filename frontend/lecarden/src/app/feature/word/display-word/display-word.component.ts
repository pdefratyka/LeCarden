import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { take, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from 'src/app/core/services/helpers/filter.service';
import * as fromStore from '../store';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-display-word',
  templateUrl: './display-word.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './display-word.component.scss',
  ],
})
export class DisplayWordComponent implements OnInit {
  words: Word[];
  filteredWords: Word[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly filterService: FilterService,
    private store: Store<fromStore.WordsState>
  ) {}

  ngOnInit(): void {
    //this.getWordsFromResolver();
    this.store.select(fromStore.getAllWords).subscribe((state) => {
      this.words = state;
      this.filteredWords = state;
      console.log(state);
    });
    this.store.dispatch(new fromStore.LoadWords());
  }

  // use async pipe assign words to words$, filter these words using pipe
  filterWords(filter: string): void {
    this.filteredWords = this.filterService.filterWords(this.words, filter);
  }

  private getWordsFromResolver(): void {
    this.route.data
      .pipe(
        map((data) => data.words),
        take(1)
      )
      .subscribe((val) => {
        this.words = val;
        this.filteredWords = val;
      });
  }
}
