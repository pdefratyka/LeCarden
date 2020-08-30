import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'synonymPipe' })
export class SynonymPipe implements PipeTransform {
  transform(word: string): string {
    word = word.replace(';', ', ');
    return word;
  }
}
