import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output()
  filter: EventEmitter<string> = new EventEmitter<string>();
  searchForm: FormGroup;
  destroy$ = new Subject();

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      query: [''],
    });

    this.searchForm.controls.query.valueChanges
      .pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe(() => {
        this.emitFilter();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
  emitFilter(): void {
    this.filter.emit(this.searchForm.controls.query.value);
  }
}
