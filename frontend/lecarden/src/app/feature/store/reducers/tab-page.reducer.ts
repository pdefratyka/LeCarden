import { createReducer, on } from '@ngrx/store';
import { TabName } from '../../home/models/tabName';
import { TabPageAction } from '../actions';

export interface TabPageState {
  currentTab: TabName;
}

export const initialState: TabPageState = {
  currentTab: 0,
};

export const TabPageReducer = createReducer<TabPageState>(
  initialState,
  on(
    TabPageAction.setCurrentTab,
    (state, action): TabPageState => {
      return {
        ...state,
        currentTab: action.tab,
      };
    }
  )
);
