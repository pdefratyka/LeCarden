import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessageComponent } from './components/message/message.component';
import { ToastMessgeComponent } from './components/toast-messge/toast-messge.component';
import { ApplicationTitleComponent } from './components/application-title/application-title.component';
import { CoreModule } from '../core/core.module';
import { TranslationConfigModule } from './config/translation-config.module';
import { SynonymPipe } from './pipes/synonym-pipe';
import { FormErrorMessageComponent } from './components/form-error-message/form-error-message.component';
import { LoadingGifComponent } from './components/loading-gif/loading-gif.component';
import { FormInformationMessageComponent } from './components/form-information-message/form-information-message.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MessageComponent,
    ToastMessgeComponent,
    ApplicationTitleComponent,
    SynonymPipe,
    FormErrorMessageComponent,
    LoadingGifComponent,
    FormInformationMessageComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    //CoreModule,
    TranslationConfigModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MessageComponent,
    ToastMessgeComponent,
    ApplicationTitleComponent,
    FormErrorMessageComponent,
    SynonymPipe,
    LoadingGifComponent,
    FormInformationMessageComponent,
    SearchComponent,
  ],
})
export class SharedModule {}
