import { Action } from '@ngrx/store';
import { Word } from 'src/app/shared/models/word';

// load words
export const LOAD_WORDS = '[Words] Load Words';
export const LOAD_WORDS_FAIL = '[Words] Load Words Fail';
export const LOAD_WORDS_SUCCESS = '[Words] Load Words Success';

export class LoadWords implements Action {
  readonly type = LOAD_WORDS;
}

export class LoadWordsFail implements Action {
  readonly type = LOAD_WORDS_FAIL;
  constructor(public payload: any) {}
}

export class LoadWordsSuccess implements Action {
  readonly type = LOAD_WORDS_SUCCESS;
  constructor(public payload: Word[]) {}
}

// action types
export type WordsAction = LoadWords | LoadWordsFail | LoadWordsSuccess;
