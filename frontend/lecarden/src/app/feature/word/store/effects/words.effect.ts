import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as wordActions from '../actions/words.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { WordService } from 'src/app/core/services/api/word.service';
import { of } from 'rxjs';

@Injectable()
export class WordsEffects {
  constructor(private actions$: Actions, private wordService: WordService) {}

  @Effect()
  loadWords$ = this.actions$.pipe(ofType(wordActions.LOAD_WORDS)).pipe(
    switchMap(() => {
      console.log('Load words');
      return this.wordService.getAllWords().pipe(
        map((words) => new wordActions.LoadWordsSuccess(words)),
        catchError((error) => of(new wordActions.LoadWordsFail(error)))
      );
    })
  );
}
