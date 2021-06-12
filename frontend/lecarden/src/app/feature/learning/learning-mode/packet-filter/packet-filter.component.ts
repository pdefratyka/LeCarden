import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { merge, of, Subject, zip } from 'rxjs';
import {
  concatAll,
  debounceTime,
  mergeAll,
  mergeMap,
  takeUntil,
} from 'rxjs/operators';
import { Language } from 'src/app/shared/models/language';
import { PacketFilter } from 'src/app/shared/models/packetFilter';

@Component({
  selector: 'app-packet-filter',
  templateUrl: './packet-filter.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './packet-filter.component.scss',
  ],
})
export class PacketFilterComponent implements OnInit {
  @Input()
  packetFilterSearch: string;
  @Input()
  packetFilterLanguage: Language;
  @Output()
  filter: EventEmitter<PacketFilter> = new EventEmitter<PacketFilter>();
  searchForm: FormGroup;
  destroy$ = new Subject();
  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      query: [''],
      language: [''],
    });

    if (this.packetFilterSearch) {
      this.searchForm.get('query').setValue(this.packetFilterSearch);
    }
    if (this.packetFilterLanguage) {
      this.searchForm
        .get('language')
        .setValue(
          `${this.packetFilterLanguage.foreignLanguage}/${this.packetFilterLanguage.knownLanguage}`
        );
    }
    merge(
      this.searchForm.controls.query.valueChanges,
      this.searchForm.controls.language.valueChanges
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.emitFilter();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
  emitFilter(): void {
    this.filter.emit({
      name: this.searchForm.controls.query.value,
      language: {
        foreignLanguage: this.searchForm.controls.language.value?.split('/')[0],
        knownLanguage: this.searchForm.controls.language.value?.split('/')[1],
      },
    } as PacketFilter);
  }
}
