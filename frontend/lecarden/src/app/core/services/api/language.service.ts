import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/app/shared/models/language';
import { EnvironmentService } from '../helpers/environment.service';
import { TokenService } from '../security/token.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly url = `${EnvironmentService.getUrl()}/words/languages`;

  constructor(
    private readonly tokenService: TokenService,
    private readonly httpClient: HttpClient
  ) {}

  getAllLanguages(): Observable<Language[]> {
    return this.httpClient.get<Language[]>(this.url);
  }
}
