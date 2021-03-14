import { createReducer, on } from '@ngrx/store';
import { LanguageWayLearningMode } from 'src/app/shared/models/languageWayLearningMode';
import { LearningMode } from 'src/app/shared/models/learningMode';
import { LearnSelectionPageAction } from '../actions';

export interface LearnSelectionState {
  packetId: number;
  languageWayLearningMode: LanguageWayLearningMode;
  learningMode: LearningMode;
  currentBasketNumber: number;
}

export const initialState: LearnSelectionState = {
  packetId: null,
  languageWayLearningMode: null,
  learningMode: null,
  currentBasketNumber: null,
};

export const learnSelectionReducer = createReducer<LearnSelectionState>(
  initialState,
  on(
    LearnSelectionPageAction.setLearningPacket,
    (state, action): LearnSelectionState => {
      return {
        ...state,
        packetId: action.packetId,
      };
    }
  ),
  on(
    LearnSelectionPageAction.setLearningMode,
    (state, action): LearnSelectionState => {
      return {
        ...state,
        learningMode: action.learningMode,
      };
    }
  ),
  on(
    LearnSelectionPageAction.setLanguageWayLearningMode,
    (state, action): LearnSelectionState => {
      return {
        ...state,
        languageWayLearningMode: action.languageWayLearningMode,
      };
    }
  ),
  on(
    LearnSelectionPageAction.setCurrentBasketNumber,
    (state, action): LearnSelectionState => {
      return {
        ...state,
        currentBasketNumber: action.basketNumber,
      };
    }
  )
);
