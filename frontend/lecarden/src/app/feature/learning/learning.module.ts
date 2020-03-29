import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForeginModeComponent } from './foregin-mode/foregin-mode.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PacketSelectorComponent } from './foregin-mode/packet-selector/packet-selector.component';

@NgModule({
  declarations: [ForeginModeComponent, PacketSelectorComponent],
  imports: [CommonModule, SharedModule]
})
export class LearningModule {}
