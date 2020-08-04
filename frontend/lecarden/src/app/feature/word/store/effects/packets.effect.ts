import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { PacketService } from 'src/app/core/services/api/packet.service';
import { FilterService } from 'src/app/core/services/helpers/filter.service';
import { PacketPageAction, PacketApiAction } from '../actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PacketsEffects {
  constructor(
    private actions$: Actions,
    private packetService: PacketService,
    private filterService: FilterService
  ) {}
  loadPackets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PacketPageAction.loadPackets),
      mergeMap((
        action // TODO figure out why do you use hier mergeMap
      ) =>
        this.packetService.getAllPacketsForUser().pipe(
          map((packets) =>
            PacketApiAction.loadPacketsSuccess({
              packets: this.filterService.filterPackets(packets, action.query),
            })
          ),
          catchError((error) =>
            of(PacketApiAction.loadPacketsFailure({ error }))
          )
        )
      )
    );
  });

  deletePacket$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PacketPageAction.deletePacket),
      mergeMap((action) =>
        this.packetService.deletePacketById(action.packetId).pipe(
          map(() =>
            PacketApiAction.deletePacketSuccess({ packetId: action.packetId })
          ),
          catchError((error) =>
            of(PacketApiAction.deletePacketFailure({ error }))
          )
        )
      )
    );
  });
}
