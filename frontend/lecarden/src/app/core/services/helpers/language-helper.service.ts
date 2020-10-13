import { Injectable } from '@angular/core';
import { Language } from 'src/app/shared/models/language';

@Injectable({
  providedIn: 'root',
})
export class LanguageHelperService {
  constructor() {}

  public selectMatchingLanguage(
    languages: Language[],
    languageOption: string
  ): Language {
    if (languageOption) {
      const arr = languageOption.split('/');
      const lan = languages.find(
        (l) => l.foreignLanguage === arr[0] && l.knownLanguage === arr[1]
      );
      return lan;
    }
    return null;
  }
}
