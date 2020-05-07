import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MenuOptionsComponent } from './components/menu/menu-options/menu-options.component';
import { RouterModule } from '@angular/router';
import { MenuUserComponent } from './components/menu/menu-user/menu-user.component';
import { MessageComponent } from './components/message/message.component';
import { ToastMessgeComponent } from './components/toast-messge/toast-messge.component';
import { ApplicationTitleComponent } from './components/application-title/application-title.component';
import { CoreModule } from '../core/core.module';
import { TranslationConfigModule } from './config/translation-config.module';
import { SynonymPipe } from './pipes/synonym-pipe';

@NgModule({
  declarations: [
    MenuComponent,
    MenuOptionsComponent,
    MenuUserComponent,
    MessageComponent,
    ToastMessgeComponent,
    ApplicationTitleComponent,
    SynonymPipe,
  ],
  imports: [CommonModule, RouterModule, CoreModule, TranslationConfigModule],
  exports: [
    MenuComponent,
    MessageComponent,
    ToastMessgeComponent,
    ApplicationTitleComponent,
    SynonymPipe,
  ],
})
export class SharedModule {}
