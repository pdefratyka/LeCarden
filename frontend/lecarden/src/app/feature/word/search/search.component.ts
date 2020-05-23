import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @ViewChild('filterInput')
  private readonly filterInput: ElementRef;
  @Output()
  filter: EventEmitter<string> = new EventEmitter<string>();

  emitFilter(): void {
    console.log(this.filterInput.nativeElement);
    this.filter.emit(this.filterInput.nativeElement.value);
  }
}
