import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslationConfigModule } from '../shared/config/translation-config.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { WordModule } from './word/word.module';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { LearningModule } from './learning/learning.module';
import { StoreModule } from '@ngrx/store';
import { TabPageReducer } from './store/reducers/tab-page.reducer';
@NgModule({
  imports: [
    FeatureRoutingModule,
    CommonModule,
    WordModule,
    //LearningModule,
    TranslationConfigModule,
    StoreModule.forFeature('tab-page', TabPageReducer),
  ],
  declarations: [HomeComponent, HeaderComponent, SidebarComponent],
})
export class FeaturesModule {}
