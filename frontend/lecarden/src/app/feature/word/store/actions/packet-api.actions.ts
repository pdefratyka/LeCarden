import { createAction, props } from '@ngrx/store';
import { Packet } from 'src/app/shared/models/packet';

export const loadPacketsSuccess = createAction(
  '[Packet API] Load Packets Success',
  props<{ packets: Packet[] }>()
);

export const loadPacketsFailure = createAction(
  '[Packet API] Load Packets Fail',
  props<{ error: string }>()
);

export const savePacketSuccess = createAction(
  '[Packet API] Save Packet Success',
  props<{ packet: Packet }>()
);

export const savePacketFailure = createAction(
  '[Packet API] Save Packet Fail',
  props<{ error: string }>()
);

export const deletePacketSuccess = createAction(
  '[Packet API] Delete Packet Success',
  props<{ packetId: number }>()
);

export const deletePacketFailure = createAction(
  '[Packet API] Delete Packet Fail',
  props<{ error: string }>()
);
