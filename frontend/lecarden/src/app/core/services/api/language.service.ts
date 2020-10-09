import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/app/shared/models/language';
import { EnvironmentService } from '../helpers/environment.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly url = `${EnvironmentService.getUrl()}/word-service/languages`;

  constructor(private readonly httpClient: HttpClient) {}

  getAllLanguages(): Observable<Language[]> {
    return this.httpClient.get<Language[]>(this.url);
  }
}
