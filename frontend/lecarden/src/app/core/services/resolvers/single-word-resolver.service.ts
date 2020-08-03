import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Word } from 'src/app/shared/models/word';
import { WordService } from '../api/word.service';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WordApiAction } from 'src/app/feature/word/store';

@Injectable({
  providedIn: 'root',
})
export class SingleWordResolverService implements Resolve<Word> {
  constructor(private readonly wordService: WordService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Word> {
    return this.wordService.getWordById(route.paramMap.get('id')).pipe(
      catchError(() => {
        return of({} as Word);
      })
    );
  }
}
