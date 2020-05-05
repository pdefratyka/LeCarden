import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Word } from 'src/app/shared/models/word';
import { WordService } from '../api/word.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SingleWordResolverService implements Resolve<Word> {
  constructor(private readonly wordService: WordService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Word> {
    return this.wordService.getWordById(route.paramMap.get('id'));
  }
}
