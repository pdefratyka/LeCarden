import { createAction, props } from '@ngrx/store';
import { Word } from 'src/app/shared/models/word';

export const loadWordsSuccess = createAction(
  '[Word API] Load Words Success',
  props<{ words: Word[] }>()
);

export const loadWordsFailure = createAction(
  '[Word API] Load Words Fail',
  props<{ error: string }>()
);

export const saveWordSuccess = createAction(
  '[Word API] Save Word Success',
  props<{ word: Word; isEditMode: boolean }>()
);

export const saveWordFailure = createAction(
  '[Word API] Save Word Fail',
  props<{ error: string }>()
);

export const deleteWordSuccess = createAction(
  '[Word API] Delete Word Success',
  props<{ wordId: number }>()
);
export const deleteWordFailure = createAction(
  '[Word API] Delete Word Failure',
  props<{ error: string }>()
);
