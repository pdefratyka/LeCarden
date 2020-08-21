import { createAction, props } from '@ngrx/store';

export const getLastResultFromPacket = createAction(
  '[Result Page] Get Last Result',
  props<{ packetId: number }>()
);

export const loadAllLastResultsForUser = createAction(
  '[Result Page] Load All Last Results For User'
);
