import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, mergeMap, concatMap, tap } from 'rxjs/operators';
import { WordService } from 'src/app/core/services/api/word.service';
import { of } from 'rxjs';
import { WordPageAction, WordApiAction } from '../actions';
import { ToastService } from 'src/app/core/services/common/toast.service';

@Injectable()
export class WordsEffects {
  constructor(
    private actions$: Actions,
    private wordService: WordService,
    private toastService: ToastService
  ) {}

  loadWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WordPageAction.loadWords),
      mergeMap(() =>
        this.wordService.getAllWords().pipe(
          map((words) => WordApiAction.loadWordsSuccess({ words })),
          catchError((error) => of(WordApiAction.loadWordsFailure({ error })))
        )
      )
    );
  });

  saveWord$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WordPageAction.saveWord),
      concatMap((action) =>
        this.wordService.saveWord(action.word).pipe(
          map((word) => WordApiAction.saveWordSuccess({ word })),
          catchError((error) => of(WordApiAction.saveWordFailure({ error })))
        )
      )
    );
  });

  saveWordSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WordApiAction.saveWordSuccess),
        tap(() => {
          this.toastService.success('Word has been saved');
        })
      );
    },
    { dispatch: false }
  );
}
