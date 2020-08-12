import { ResultState } from './results.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LearnState } from './learn.reducer';
import { LearningMode } from 'src/app/shared/models/learningMode';

export interface ResultsState {
  results: ResultState;
}

const getResultFeatureState = createFeatureSelector<ResultState>('results');
const getLearningFeatureState = createFeatureSelector<LearnState>('learn');

export const getLearningPacketId = createSelector(
  getLearningFeatureState,
  (state) => state.packetId
);

export const getLearningMode = createSelector(
  getLearningFeatureState,
  (state) => state.mode
);

export const getLastResult = createSelector(
  getResultFeatureState,
  getLearningPacketId,
  getLearningMode,
  (state, learningPacketId, learningMode) =>
    state.results.filter(
      (r) =>
        r &&
        r.packetId === learningPacketId &&
        learningMode !== null &&
        r.learningMode.toString() === LearningMode[learningMode]
    )
);
