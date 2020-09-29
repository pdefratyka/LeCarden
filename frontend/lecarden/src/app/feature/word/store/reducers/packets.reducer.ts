import { createReducer, on } from '@ngrx/store';
import { PacketApiAction, PacketPageAction } from '../actions';
import { Packet } from 'src/app/shared/models/packet';
import { Word } from 'src/app/shared/models/word';

export interface PacketState {
  packets: Packet[];
  currentPacket: Packet;
  newPacket: {
    // it should be currentPacket with id number or null, when we select edit then here are words assigned
    name: string;
    words: Word[];
  };
}
export const initialState: PacketState = {
  packets: [],
  currentPacket: {
    name: '',
    words: [],
  },
  newPacket: {
    name: '',
    words: [],
  },
};
export const packetReducer = createReducer<PacketState>(
  initialState,
  on(
    PacketApiAction.loadPacketsSuccess,
    (state, action): PacketState => {
      return {
        ...state,
        packets: action.packets,
      };
    }
  ),
  on(
    PacketApiAction.deletePacketSuccess,
    (state, action): PacketState => {
      return {
        ...state,
        packets: state.packets.filter(
          (packet) => packet.id !== action.packetId
        ),
      };
    }
  ),
  on(
    PacketApiAction.savePacketSuccess,
    (state, action): PacketState => {
      return {
        ...state,
        packets: [...state.packets, action.packet],
        currentPacket: { name: '', words: [] },
      };
    }
  ),
  on(
    PacketPageAction.addWordToPacket,
    (state, action): PacketState => {
      const updatedPacket = {
        words: [...state.currentPacket.words, action.word],
        name: state.currentPacket.name,
        languageTO: state.currentPacket.languageTO,
        languageId: state.currentPacket.languageId,
        id: state.currentPacket.id,
        userId: state.currentPacket.userId,
      };
      return {
        ...state,
        currentPacket: updatedPacket,
      };
    }
  ),
  on(
    PacketPageAction.removeWordFromPacket,
    (state, action): PacketState => {
      const updatedPacket = {
        words: state.currentPacket.words.filter(
          (word) => word.id !== action.wordId
        ),
        name: state.currentPacket.name,
        languageTO: state.currentPacket.languageTO,
        languageId: state.currentPacket.languageId,
        id: state.currentPacket.id,
        userId: state.currentPacket.userId,
      };
      return {
        ...state,
        currentPacket: updatedPacket,
      };
    }
  ),
  on(
    PacketPageAction.setCurrentPacketName,
    (state, action): PacketState => {
      const updatedPacket = {
        words: state.currentPacket.words,
        name: action.name,
        languageTO: state.currentPacket.languageTO,
        languageId: state.currentPacket.languageId,
        id: state.currentPacket.id,
        userId: state.currentPacket.userId,
      };
      return {
        ...state,
        currentPacket: updatedPacket,
      };
    }
  ),
  on(
    PacketPageAction.setPacketLanguage,
    (state, action): PacketState => {
      const updatedPacket = {
        words: state.currentPacket.words,
        name: state.currentPacket.name,
        languageTO: action.language,
        languageId: action.language?.id,
        id: state.currentPacket.id,
        userId: state.currentPacket.userId,
      };
      return {
        ...state,
        currentPacket: updatedPacket,
      };
    }
  ),
  on(
    PacketPageAction.clearCurrentPacket,
    (state, action): PacketState => {
      return {
        ...state,
        currentPacket: { name: '', words: [] },
      };
    }
  ),
  on(
    PacketPageAction.updatePacket,
    (state, action): PacketState => {
      return {
        ...state,
        currentPacket: action.packet,
      };
    }
  )
);
