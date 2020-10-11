import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslationConfigModule } from '../shared/config/translation-config.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { WordModule } from './word/word.module';
import { SidebarComponent } from './home/sidebar/sidebar.component';

@NgModule({
  imports: [
    FeatureRoutingModule,
    CommonModule,
    WordModule,
    TranslationConfigModule,
  ],
  declarations: [HomeComponent, HeaderComponent, SidebarComponent],
})
export class FeaturesModule {}
