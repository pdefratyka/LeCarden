import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ResultPageAction, ResultApiAction } from '../actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { ResultService } from 'src/app/core/services/api/result.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class ResultsEffects {
  constructor(
    private actions$: Actions,
    private readonly resultService: ResultService,
    private readonly router: Router
  ) {}

  loadResult$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResultPageAction.getLastResultFromPacket),
      mergeMap((action) =>
        this.resultService.getLastResult(action.packetId).pipe(
          map((result) =>
            ResultApiAction.loadResultSuccess({
              result,
            })
          ),
          catchError((error) =>
            of(ResultApiAction.loadResultFailure({ error }))
          )
        )
      )
    );
  });

  loadAllLastResults$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResultPageAction.loadAllLastResultsForUser),
      mergeMap((action) =>
        this.resultService.getAllLastResultsForUser().pipe(
          map((result) =>
            ResultApiAction.loadAllLastResultsForUserSeccuess({
              result,
            })
          ),
          catchError((error) =>
            of(ResultApiAction.loadAllLastResultsForUserFailure({ error }))
          )
        )
      )
    );
  });

  saveResult$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResultPageAction.saveResult),
      mergeMap((action) =>
        this.resultService.saveResult(action.result).pipe(
          map((result) =>
            ResultApiAction.saveResultSuccess({
              result,
            })
          ),
          catchError((error) =>
            of(ResultApiAction.saveResultFailure({ error }))
          )
        )
      )
    );
  });

  saveResultSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ResultApiAction.saveResultSuccess),
        tap((action) => {
          this.router.navigate(['learn']);
        })
      );
    },
    { dispatch: false }
  );
}
