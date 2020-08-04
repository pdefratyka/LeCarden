import { createReducer, on } from '@ngrx/store';
import { PacketApiAction } from '../actions';
import { Packet } from 'src/app/shared/models/packet';

export interface PacketState {
  packets: Packet[];
}
export const initialState: PacketState = {
  packets: [],
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
  )
);
