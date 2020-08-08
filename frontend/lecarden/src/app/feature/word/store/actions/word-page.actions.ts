import { createAction, props } from '@ngrx/store';
import { Word } from 'src/app/shared/models/word';

export const loadWords = createAction(
  '[Word Page] Load',
  props<{ query: string }>()
);
export const saveWord = createAction(
  '[Word Page] Save Word',
  props<{ word: Word; isEditMode: boolean }>()
);
export const deleteWord = createAction(
  '[Word Page] Delete Word',
  props<{ wordId: number }>()
);
