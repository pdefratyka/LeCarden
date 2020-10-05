import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './feature/authentication/authentication.module';
import { SharedModule } from './shared/shared.module';
import { WordModule } from './feature/word/word.module';
import { CoreModule } from './core/core.module';
import { LearningModule } from './feature/learning/learning.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    SharedModule,
    CoreModule,
    WordModule,
    LearningModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    environment.development ? StoreDevtoolsModule.instrument() : [],
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
