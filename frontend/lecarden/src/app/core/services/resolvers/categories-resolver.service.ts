import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { WordService } from '../api/word.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolverService implements Resolve<string[]> {
  constructor(private readonly wordService: WordService) {}

  resolve(): Observable<string[]> {
    return this.wordService.getAllWordsCategoriesByUser();
  }
}
