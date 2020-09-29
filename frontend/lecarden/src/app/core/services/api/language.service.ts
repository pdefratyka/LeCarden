import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/app/shared/models/language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly url = 'api/word-service/languages';

  constructor(private readonly httpClient: HttpClient) {}

  getAllLanguages(): Observable<Language[]> {
    return this.httpClient.get<Language[]>(this.url);
  }
}
