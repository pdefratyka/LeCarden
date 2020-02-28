import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/shared/models/word';
import { take, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private readonly route: ActivatedRoute) {}
  ngOnInit(): void {
    // We shouldn't load all words at once, let's load just 100 and the rest after scroll
    this.route.data
      .pipe(
        map(data => data.words),
        take(1)
      )
      .subscribe(val => {
        this.words = val;
      });
  }
}
