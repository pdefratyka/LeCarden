import { ResultState } from './results.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LearnState } from './learn.reducer';
import { LearningMode } from 'src/app/shared/models/learningMode';
import { PacketState } from 'src/app/feature/word/store/reducers/packets.reducer';
import { Packet } from 'src/app/shared/models/packet';

export interface ResultsState {
  results: ResultState;
}

const getResultFeatureState = createFeatureSelector<ResultState>('results');
const getLearningFeatureState = createFeatureSelector<LearnState>('learn');
const getPackets = createFeatureSelector<PacketState>('packets');

export const getLearningPacketId = createSelector(
  getLearningFeatureState,
  (state) => state.packetId
);

export const getLearningMode = createSelector(
  getLearningFeatureState,
  (state) => state.mode
);

export const getLastResultMode = createSelector(
  getLearningFeatureState,
  (state) => state.isLastResultMode
);

export const getLastResult = createSelector(
  getResultFeatureState,
  getLearningPacketId,
  getLearningMode,
  (state, learningPacketId, learningMode) =>
    state.results.find(
      (r) =>
        r &&
        r.packetId === learningPacketId &&
        learningMode !== null &&
        r.learningMode.toString() === LearningMode[learningMode]
    )
);

export const getLearningPacket = createSelector(
  getLearningFeatureState,
  getLastResult,
  getPackets,
  getLearningPacketId,
  (state, lastResult, packets, packetId) => {
    const currentPacket = packets.packets.find((p) => p.id === packetId);
    if (state.isLastResultMode) {
      const lastPacket = {
        id: packetId,
        userId: lastResult.userId,
        words: [], // TODO Maybe it would be better to store only ids
      } as Packet;
      const wordsToadd = lastResult.wordsResultsTOs.filter(
        (wr) => wr.attempts > 1
      );
      wordsToadd.forEach((wta) => {
        lastPacket.words.push(
          currentPacket.words.find((w) => w.id === wta.wordId)
        );
      });

      return lastPacket;
    }
    return currentPacket;
  }
);
