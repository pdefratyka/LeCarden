import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../assets/i18n/', '.json');
}

const translationOptions = {
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
};

@NgModule({
  declarations: [],
  imports: [CommonModule, TranslateModule.forRoot(translationOptions)],
  exports: [TranslateModule],
  providers: [TranslateService]
})
export class TranslationConfigModule {
  private browserLang;

  constructor(private translateService: TranslateService) {
    translateService.addLangs(['en']);
    translateService.setDefaultLang('en');
    this.browserLang = translateService.getBrowserLang();
    translateService.use(
      this.browserLang.match(/en|it/) ? this.browserLang : 'en'
    );
  }

  public getBrowserLang() {
    if (this.browserLang === undefined || this.browserLang === null) {
      this.browserLang = 'en';
    }
    return this.browserLang;
  }
}
