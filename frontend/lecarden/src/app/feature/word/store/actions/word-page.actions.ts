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

export const editWord = createAction(
  '[Word Page] Edit Word',
  props<{ word: Word }>()
);

export const updateWord = createAction(
  '[Word Page] Update Word',
  props<{ word: Word }>()
);

export const clearCurrentWord = createAction('[Word Page] Clear Current Word');

export const deleteWord = createAction(
  '[Word Page] Delete Word',
  props<{ wordId: number }>()
);
