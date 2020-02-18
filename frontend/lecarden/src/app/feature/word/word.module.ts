import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWordComponent } from './add-word/add-word.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddWordFormComponent } from './add-word/add-word-form/add-word-form.component';
import { DisplayWordComponent } from './display-word/display-word.component';
import { AddPacketComponent } from './add-packet/add-packet.component';
import { WordMenuComponent } from './add-packet/word-menu/word-menu.component';
import { PacketMenuComponent } from './add-packet/packet-menu/packet-menu.component';
import { AddPacketWordTableComponent } from './add-packet/word-menu/add-packet-word-table/add-packet-word-table.component';
import { AddPacketWordFilterComponent } from './add-packet/word-menu/add-packet-word-filter/add-packet-word-filter.component';
import { WordFilterComponent } from './display-word/word-filter/word-filter.component';
import { WordTableComponent } from './display-word/word-table/word-table.component';
import { PacketNameComponent } from './add-packet/packet-menu/packet-name/packet-name.component';
import { WordsListComponent } from './add-packet/packet-menu/words-list/words-list.component';
import { AddPacketButtonPanelComponent } from './add-packet/packet-menu/add-packet-button-panel/add-packet-button-panel.component';

@NgModule({
  declarations: [
    AddWordComponent,
    AddWordFormComponent,
    DisplayWordComponent,
    AddPacketComponent,
    WordMenuComponent,
    WordFilterComponent,
    WordTableComponent,
    PacketMenuComponent,
    AddPacketWordTableComponent,
    AddPacketWordFilterComponent,
    PacketNameComponent,
    WordsListComponent,
    AddPacketButtonPanelComponent
  ],
  imports: [CommonModule, SharedModule]
})
export class WordModule {}
