import { ResultState } from './results.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LearnState } from './learn.reducer';
import { LearningMode } from 'src/app/shared/models/learningMode';
import { PacketState } from 'src/app/feature/word/store/reducers/packets.reducer';
import { Packet } from 'src/app/shared/models/packet';
import { BasketState } from './basket.reducer';

export interface ResultsState {
  results: ResultState;
}

const getResultFeatureState = createFeatureSelector<ResultState>('results');
const getLearningFeatureState = createFeatureSelector<LearnState>('learn');
const getPackets = createFeatureSelector<PacketState>('packets');
const getBasket = createFeatureSelector<BasketState>('basket');

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

export const isBasketModeSlected = createSelector(
  getLearningFeatureState,
  (state) => state.isBasketModeSelected
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

export const getCurrentBasket = createSelector(getBasket, (state) => {
  return state.currentBasket;
});

export const getBasketByPacketId = createSelector(
  getBasket,
  getLearningPacketId,
  (state, packetId) => {
    return state.baskets.filter((b) => b.packetId === packetId);
  }
);

export const getLearningPacket = createSelector(
  getLearningFeatureState,
  getLastResult,
  getPackets,
  getLearningPacketId,
  getCurrentBasket,
  getBasketByPacketId,
  (state, lastResult, packets, packetId, currentBasket, basket) => {
    const currentPacket = packets.packets.find((p) => p.id === packetId);
    if (state.isLastResultMode) {
      const lastPacket = {
        id: packetId,
        userId: lastResult.userId,
        words: [],
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
    const tempBasket = basket.find((b) => b.number === currentBasket?.number);
    if (currentBasket?.id && tempBasket) {
      const lastPacket = {
        id: tempBasket.packetId,
        userId: tempBasket.userId,
        words: currentPacket.words.filter((w) => {
          let k = false;
          for (let i = 0; i < tempBasket.basketWords.length; i++) {
            if (tempBasket.basketWords[i].wordId === w.id) {
              k = true;
              break;
            }
          }
          return k;
        }),
      } as Packet;
      return lastPacket;
    } else if (currentBasket && currentBasket?.number > 1) {
      return { words: [] } as Packet;
    }
    return currentPacket;
  }
);
