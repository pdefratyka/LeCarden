import { createAction, props } from '@ngrx/store';
import { Word } from 'src/app/shared/models/word';

export const loadWords = createAction('[Word Page] Load');
export const saveWord = createAction(
  '[Word Page] Save Word',
  props<{ word: Word }>()
);
