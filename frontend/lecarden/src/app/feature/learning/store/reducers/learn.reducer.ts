import { LearnPageAction } from '../actions';
import { createReducer, on } from '@ngrx/store';
import { LearningMode } from 'src/app/shared/models/learningMode';

export interface LearnState {
  packetId: number;
  mode: LearningMode;
}

export const initialState: LearnState = {
  packetId: null,
  mode: null,
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
        mode: action.learningMode,
      };
    }
  )
);
