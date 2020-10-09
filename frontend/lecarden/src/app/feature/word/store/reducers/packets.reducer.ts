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
    PacketApiAction.loadPacketsWordsSuccess,
    (state, action): PacketState => {
      if (action.isEditMode) {
        return {
          ...state,
          currentPacket: {
            id: state.currentPacket.id,
            languageId: state.currentPacket.languageId,
            languageTO: state.currentPacket.languageTO,
            userId: state.currentPacket.userId,
            name: state.currentPacket.name,
            words: action.words,
          },
        };
      }
      const oldPacket = state.packets.find((p) => p.id === action.packetId);
      const newPacket = createNewPacket(oldPacket, action.words);
      const packetsToAdd = [];
      state.packets.forEach((p) => {
        if (p.id !== oldPacket.id) {
          packetsToAdd.push(p);
        }
      });
      return {
        ...state,
        packets: [...packetsToAdd, newPacket],
      };
    }
  ),
  on(
    PacketApiAction.loadPacketsWordsFailure,
    (state, action): PacketState => {
      console.log('FAIL');
      return {
        ...state,
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

function createNewPacket(oldPacket: Packet, words: Word[]): Packet {
  return {
    name: oldPacket.name,
    id: oldPacket.id,
    userId: oldPacket.userId,
    builtIn: oldPacket.builtIn,
    languageId: oldPacket.languageId,
    languageTO: oldPacket.languageTO,
    words,
  } as Packet;
}
