import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BasketService } from 'src/app/core/services/api/basket.service';
import { BasketPageAction, BasketApiAction } from '../actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BasketEffects {
  constructor(
    private actions$: Actions,
    private readonly basketService: BasketService,
    private readonly router: Router
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

  updateBasket$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BasketPageAction.updateBasket),
      mergeMap((action) =>
        this.basketService.updateBaskets(action.basketResult).pipe(
          map((baskets) => BasketApiAction.updateBasketSuccess({ baskets })),
          catchError((error) =>
            of(BasketApiAction.updateBasketFailture({ error }))
          )
        )
      )
    );
  });

  saveResultSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BasketApiAction.updateBasketSuccess),
        tap((action) => {
          this.router.navigate(['learn']);
        })
      );
    },
    { dispatch: false }
  );

  resetBaskets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BasketPageAction.resetBaskets),
      mergeMap((action) =>
        this.basketService.resetBaskets(action.packetId).pipe(
          map(() =>
            BasketApiAction.resetBasketsSuccess({ packetId: action.packetId })
          ),
          catchError((error) =>
            of(BasketApiAction.resetBasketsFailure({ error }))
          )
        )
      )
    );
  });
}
