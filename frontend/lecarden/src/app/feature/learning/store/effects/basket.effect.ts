import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BasketService } from 'src/app/core/services/api/basket.service';
import { BasketPageAction, BasketApiAction } from '../actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class BasketEffects {
  constructor(
    private actions$: Actions,
    private readonly basketService: BasketService
  ) {}

  loadBaskets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BasketPageAction.loadBasketsForUser),
      mergeMap((action) =>
        this.basketService.getAllPacketsForUser().pipe(
          map((baskets) =>
            BasketApiAction.loadBasketsForUserSuccess({
              baskets,
            })
          ),
          catchError((error) =>
            of(BasketApiAction.loadBasketsForUserFailure({ error }))
          )
        )
      )
    );
  });
}
