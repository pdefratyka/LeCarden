import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, mergeMap, concatMap, tap } from 'rxjs/operators';
import { WordService } from 'src/app/core/services/api/word.service';
import { of } from 'rxjs';
import { WordPageAction, WordApiAction } from '../actions';
import { ToastService } from 'src/app/core/services/common/toast.service';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/core/services/helpers/filter.service';

@Injectable()
export class WordsEffects {
  constructor(
    private actions$: Actions,
    private wordService: WordService,
    private toastService: ToastService,
    private filterService: FilterService,
    private readonly router: Router
  ) {}

  loadWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WordPageAction.loadWords),
      mergeMap((action) =>
        this.wordService.getAllWords().pipe(
          map((words) =>
            WordApiAction.loadWordsSuccess({
              words: this.filterService.filterWords(words, action.query),
            })
          ),
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
          map((word) =>
            WordApiAction.saveWordSuccess({
              word,
              isEditMode: action.isEditMode,
            })
          ),
          catchError((error) => of(WordApiAction.saveWordFailure({ error })))
        )
      )
    );
  });

  deleteWord$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WordPageAction.deleteWord),
      concatMap((action) =>
        this.wordService.deleteWord(action.wordId).pipe(
          map(() => WordApiAction.deleteWordSuccess({ wordId: action.wordId })),
          catchError((error) => of(WordApiAction.deleteWordFailure({ error })))
        )
      )
    );
  });

  saveWordSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WordApiAction.saveWordSuccess),
        tap((action) => {
          this.toastService.success('Word has been saved');
          if (action.isEditMode) {
            this.router.navigate(['display-word']);
          }
        })
      );
    },
    { dispatch: false }
  );

  deleteWordFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WordApiAction.deleteWordFailure),
        tap((action) => {})
      );
    },
    { dispatch: false }
  );

  deleteWordSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WordApiAction.deleteWordSuccess),
        tap((action) => {})
      );
    },
    { dispatch: false }
  );

  editWord$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WordPageAction.editWord),
        tap((action) => {
          this.router.navigate(['add-word']);
        })
      );
    },
    { dispatch: false }
  );

  updateWord$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WordPageAction.updateWord),
        mergeMap((action) =>
          this.wordService.updateWord(action.word).pipe(
            map((word) => {
              this.toastService.success('Word has been updated');
              return WordApiAction.updateWordSuccess({
                word,
              });
            }),
            catchError((error) =>
              of(WordApiAction.updateWordFailure({ error }))
            )
          )
        )
      );
    },
    { dispatch: false }
  );
}
