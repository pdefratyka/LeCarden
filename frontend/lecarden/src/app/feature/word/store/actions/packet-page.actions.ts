import { createAction, props } from '@ngrx/store';
import { Packet } from 'src/app/shared/models/packet';

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
