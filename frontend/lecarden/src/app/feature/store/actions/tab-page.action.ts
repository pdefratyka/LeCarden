import { createAction, props } from '@ngrx/store';
import { TabName } from '../../home/models/tabName';

// TODO change string to enum
export const setCurrentTab = createAction(
  '[Tab Page] Set Current tab',
  props<{ tab: TabName }>()
);
