import { createAction, props } from '@ngrx/store';

export const getLastResultFromPacket = createAction(
  '[Result Page] Get Last Result',
  props<{ packetId: number }>()
);
