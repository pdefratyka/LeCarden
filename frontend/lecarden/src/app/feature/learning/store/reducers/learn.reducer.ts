import { LearnPageAction } from '../actions';
import { createReducer, on } from '@ngrx/store';
import { LanguageWayLearningMode } from 'src/app/shared/models/languageWayLearningMode';

export interface LearnState {
  packetId: number;
  mode: LanguageWayLearningMode;
  isLastResultMode: boolean;
  finalBasketMode: boolean;
  isBasketModeSelected: boolean;
}

export const initialState: LearnState = {
  packetId: null,
  mode: null,
  isLastResultMode: false,
  finalBasketMode: false,
  isBasketModeSelected: false,
};

export const learnReducer = createReducer<LearnState>(
  initialState,
  on(
    LearnPageAction.setLearningPacket,
    (state, action): LearnState => {
      return {
        ...state,
        packetId: action.packetId,
      };
    }
  ),
  on(
    LearnPageAction.setLearningMode,
    (state, action): LearnState => {
      return {
        ...state,
        mode: action.languageWayLearningMode,
      };
    }
  ),
  on(
    LearnPageAction.setLastResultMode,
    (state, action): LearnState => {
      return {
        ...state,
        isLastResultMode: action.isLastResultMode,
      };
    }
  ),
  on(
    LearnPageAction.setFinalBasketMode,
    (state, action): LearnState => {
      return {
        ...state,
        finalBasketMode: !state.finalBasketMode,
      };
    }
  ),
  on(
    LearnPageAction.selectBasketMode,
    (state, action): LearnState => {
      return {
        ...state,
        isBasketModeSelected: !state.isBasketModeSelected,
      };
    }
  )
);
