import { createAction, props } from '@ngrx/store';
import { Result } from 'src/app/shared/models/result';

export const getLastResultFromPacket = createAction(
  '[Result Page] Get Last Result',
  props<{ packetId: number }>()
);

export const loadAllLastResultsForUser = createAction(
  '[Result Page] Load All Last Results For User'
);

export const saveResult = createAction(
  '[Result Page] Save Result',
  props<{ result: Result }>()
);
