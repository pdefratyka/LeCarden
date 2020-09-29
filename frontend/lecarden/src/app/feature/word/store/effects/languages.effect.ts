import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LanguageService } from 'src/app/core/services/api/language.service';
import { LanguageApiAction, LanguagePageAction } from '../actions';

@Injectable()
export class LanguagesEffects {
  constructor(
    private actions$: Actions,
    private languageService: LanguageService
  ) {}

  loadLanguages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LanguagePageAction.loadLanguages),
      mergeMap((action) => {
        return this.languageService.getAllLanguages().pipe(
          map((languages) =>
            LanguageApiAction.loadLanguagesSuccess({
              languages,
            })
          ),
          catchError((error) =>
            of(LanguageApiAction.loadLanguagesFailure({ error }))
          )
        );
      })
    );
  });
}
