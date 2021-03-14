import { createAction, props } from '@ngrx/store';
import { LanguageWayLearningMode } from 'src/app/shared/models/languageWayLearningMode';
import { LearningMode } from 'src/app/shared/models/learningMode';

export const LEARN_SELECTION_PAGE_TITLE = '[Learn Selectiong Page]';

export const setLearningPacket = createAction(
  `${LEARN_SELECTION_PAGE_TITLE} Set Packet`,
  props<{ packetId: number }>()
);

export const setLanguageWayLearningMode = createAction(
  `${LEARN_SELECTION_PAGE_TITLE} Set Language Way Learning Mode`,
  props<{ languageWayLearningMode: LanguageWayLearningMode }>()
);

export const setLearningMode = createAction(
  `${LEARN_SELECTION_PAGE_TITLE} Set Language Learning Mode`,
  props<{ learningMode: LearningMode }>()
);

export const setCurrentBasketNumber = createAction(
  `${LEARN_SELECTION_PAGE_TITLE} Set Current Basket Number`,
  props<{ basketNumber: number }>()
);
