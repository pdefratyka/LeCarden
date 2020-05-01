import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-current-word',
  templateUrl: './current-word.component.html',
  styleUrls: [
    './../../../../../shared/styles/global.scss',
    './current-word.component.scss',
  ],
})
export class CurrentWordComponent {
  @Input()
  word: string;
}
