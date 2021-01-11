import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWordComponent } from './add-word/add-word.component';
import { AddWordFormComponent } from './add-word/add-word-form/add-word-form.component';
import { DisplayWordComponent } from './display-word/display-word.component';
import { AddPacketComponent } from './add-packet/add-packet.component';
import { WordMenuComponent } from './add-packet/word-menu/word-menu.component';
import { PacketMenuComponent } from './add-packet/packet-menu/packet-menu.component';
import { AddPacketWordTableComponent } from './add-packet/word-menu/add-packet-word-table/add-packet-word-table.component';
import { WordTableComponent } from './display-word/word-table/word-table.component';
import { PacketNameComponent } from './add-packet/packet-menu/packet-name/packet-name.component';
import { WordsListComponent } from './add-packet/packet-menu/words-list/words-list.component';
import { AddPacketButtonPanelComponent } from './add-packet/packet-menu/add-packet-button-panel/add-packet-button-panel.component';
import { DisplayPacketComponent } from './display-packet/display-packet.component';
import { PacketTableComponent } from './display-packet/packet-table/packet-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { TranslationConfigModule } from 'src/app/shared/config/translation-config.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { wordReducer } from './store/reducers/words.reducer';
import { packetReducer } from './store/reducers/packets.reducer';
import { languageReducer } from './store/reducers/languages.reducer';
import { WordsEffects } from './store/effects/words.effect';
import { PacketsEffects } from './store/effects/packets.effect';
import { LanguagesEffects } from './store/effects/languages.effect';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CategoriesEffects } from './store/effects/categories.effect';
import { categoryReducer } from './store/reducers/categories.reducer';
import { TokenInterceptorService } from 'src/app/core/services/security/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [
    AddWordComponent,
    AddWordFormComponent,
    DisplayWordComponent,
    AddPacketComponent,
    WordMenuComponent,
    WordTableComponent,
    PacketMenuComponent,
    AddPacketWordTableComponent,
    PacketNameComponent,
    WordsListComponent,
    AddPacketButtonPanelComponent,
    DisplayPacketComponent,
    PacketTableComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslationConfigModule,
    InfiniteScrollModule,
    StoreModule.forFeature('words', wordReducer),
    StoreModule.forFeature('packets', packetReducer),
    StoreModule.forFeature('languages', languageReducer),
    StoreModule.forFeature('categories', categoryReducer),
    EffectsModule.forFeature([
      WordsEffects,
      PacketsEffects,
      LanguagesEffects,
      CategoriesEffects,
    ]),
  ],
})
export class WordModule {}
