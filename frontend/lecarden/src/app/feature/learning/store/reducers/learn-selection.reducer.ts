import { LanguageWayLearningMode } from 'src/app/shared/models/languageWayLearningMode';

export interface LearnSelectionState {
  packetId: number;
  mode: LanguageWayLearningMode;
  isLastResultMode: boolean;
  finalBasketMode: boolean;
  isBasketModeSelected: boolean;
}

export const initialState: LearnSelectionState = {
  packetId: null,
  mode: null,
  isLastResultMode: false,
  finalBasketMode: false,
  isBasketModeSelected: false,
};
