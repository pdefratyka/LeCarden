import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { PacketService } from 'src/app/core/services/api/packet.service';
import { FilterService } from 'src/app/core/services/helpers/filter.service';
import { PacketPageAction, PacketApiAction } from '../actions';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'src/app/core/services/common/toast.service';
import { Router } from '@angular/router';
import { WordService } from 'src/app/core/services/api/word.service';

@Injectable()
export class PacketsEffects {
  constructor(
    private actions$: Actions,
    private packetService: PacketService,
    private wordService: WordService,
    private filterService: FilterService,
    private toastService: ToastService,
    private readonly router: Router
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

  loadPacketsWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PacketPageAction.loadPacketsWords),
      mergeMap((
        action // TODO figure out why do you use hier mergeMap
      ) =>
        this.wordService.getWordsByPacketId(action.packetId).pipe(
          map((words) =>
            PacketApiAction.loadPacketsWordsSuccess({
              words,
              packetId: action.packetId,
              isEditMode: false,
            })
          ),
          catchError((error) =>
            of(PacketApiAction.loadPacketsWordsFailure({ error }))
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

  savePacket$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PacketPageAction.savePacket),
      concatMap((action) =>
        this.packetService.savePacket(action.packet).pipe(
          map(() =>
            PacketApiAction.savePacketSuccess({ packet: action.packet })
          ),
          catchError((error) =>
            of(PacketApiAction.savePacketFailure({ error }))
          )
        )
      )
    );
  });

  savePacketSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PacketApiAction.savePacketSuccess),
        tap((action) => {
          this.toastService.success(
            `Packet ${action.packet.name} has been saved`
          );
          this.router.navigate(['display-packet']);
        })
      );
    },
    { dispatch: false }
  );

  loadPacketsWordsSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PacketApiAction.loadPacketsWordsSuccess),
        tap((action) => {
          if (action.isEditMode) {
            this.router.navigate(['add-packet']);
          } else {
            this.router.navigate(['/learn/translation/']);
          }
          //[routerLink]="['/learn/translation/']"
        })
      );
    },
    { dispatch: false }
  );

  updatePacket$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PacketPageAction.updatePacket),
      mergeMap((
        action // TODO figure out why do you use hier mergeMap
      ) =>
        this.wordService.getWordsByPacketId(action.packet.id).pipe(
          map((words) =>
            PacketApiAction.loadPacketsWordsSuccess({
              words,
              packetId: action.packet.id,
              isEditMode: true,
            })
          ),
          catchError((error) =>
            of(PacketApiAction.loadPacketsWordsFailure({ error }))
          )
        )
      )
    );
  });
}
