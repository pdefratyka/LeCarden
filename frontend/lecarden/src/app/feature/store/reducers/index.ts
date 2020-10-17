import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TabPageState } from './tab-page.reducer';

const getTabPageState = createFeatureSelector<TabPageState>('tab-page');

export const getCurrentTab = createSelector(
  getTabPageState,
  (state) => state.currentTab
);
