import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current-word',
  templateUrl: './current-word.component.html',
  styleUrls: [
    './../../../../../shared/styles/global.scss',
    './current-word.component.scss',
  ],
})
export class CurrentWordComponent implements OnInit {
  @Input()
  word: string;
  constructor() {}

  ngOnInit() {}
}
