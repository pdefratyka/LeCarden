import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TabName } from 'src/app/feature/home/models/tabName';
import { TabPageAction } from 'src/app/feature/store';

@Injectable({
  providedIn: 'root',
})
export class TabSerivce {
  constructor(private store: Store) {}

  setCurrentTab(tab: TabName): void {
    this.store.dispatch(TabPageAction.setCurrentTab({ tab }));
  }
}
