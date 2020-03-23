import { Injectable } from '@angular/core';
import { Word } from 'src/app/shared/models/word';

@Injectable({
  providedIn: 'root'
})
export class WordHelperService {
  filterWords(words: Word[], filter: string): Word[] {
    return words.filter(w => {
      if (
        w.name.includes(filter) ||
        w.translation.includes(filter) ||
        (w.category && w.category.includes(filter))
      ) {
        return w;
      }
    });
  }
}
