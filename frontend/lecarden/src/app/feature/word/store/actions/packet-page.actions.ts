import { createAction, props } from '@ngrx/store';
import { Language } from 'src/app/shared/models/language';
import { Packet } from 'src/app/shared/models/packet';
import { Word } from 'src/app/shared/models/word';

export const loadPackets = createAction(
  '[Packet Page] Load',
  props<{ query: string }>()
);
export const savePacket = createAction(
  '[Packet Page] Save Packet',
  props<{ packet: Packet }>()
);
export const deletePacket = createAction(
  '[Packet Page] Delete Packet',
  props<{ packetId: number }>()
);
export const addWordToPacket = createAction(
  '[Packet Page] Add Word To Packet',
  props<{ word: Word }>()
);
export const removeWordFromPacket = createAction(
  '[Packet Page] Remove Word From Packet',
  props<{ wordId: number }>()
);
export const setCurrentPacketName = createAction(
  '[Packet Page] Set CurrentPacket Name',
  props<{ name: string }>()
);
export const setPacketLanguage = createAction(
  '[Packet Page] Set Packet Language',
  props<{ language: Language }>()
);
export const clearCurrentPacket = createAction(
  '[Packet Page] Clear CurrentPacket'
);
export const updatePacket = createAction(
  '[Packet Page] Update Packet',
  props<{ packet: Packet }>()
);
export const loadPacketsWords = createAction(
  '[Packet Page] Load packets words',
  props<{ packetId: number }>()
);
