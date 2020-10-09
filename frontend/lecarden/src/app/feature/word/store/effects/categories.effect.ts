import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { WordService } from 'src/app/core/services/api/word.service';
import { CategoryApiAction, CategoryPageAction } from '../actions';

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions, private wordService: WordService) {}

  loadLanguages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryPageAction.loadCategories),
      mergeMap(() => {
        return this.wordService.getAllWordsCategoriesByUser().pipe(
          map((categories) =>
            CategoryApiAction.loadCategoriesSuccess({
              categories,
            })
          ),
          catchError((error) =>
            of(CategoryApiAction.loadCategoriesFailure({ error }))
          )
        );
      })
    );
  });
}
