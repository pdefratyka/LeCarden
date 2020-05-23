import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-gif',
  templateUrl: './loading-gif.component.html',
  styleUrls: ['./loading-gif.component.scss'],
})
export class LoadingGifComponent {
  @Input()
  loadGif: boolean;
}
