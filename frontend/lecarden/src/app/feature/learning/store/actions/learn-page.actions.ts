import { createAction, props } from '@ngrx/store';
import { LearningMode } from 'src/app/shared/models/learningMode';

export const setLearningPacket = createAction(
  '[Learn Page] Set Packet',
  props<{ packetId: number }>()
);

export const setLearningMode = createAction(
  '[Learn Page] Set Learning Mode',
  props<{ learningMode: LearningMode }>()
);

export const setLastResultMode = createAction(
  '[Learn Page] Set Last Result Mode',
  props<{ isLastResultMode: boolean }>()
);
