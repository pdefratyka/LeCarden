import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LearningModeComponent } from './learning-mode/learning-mode.component';
import { PacketTableComponent } from './learning-mode/packet-table/packet-table.component';
import { LearningModeSelectorComponent } from './learning-mode/learning-mode-selector/learning-mode-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { LearningTranslationComponent } from './learning-translation/learning-translation.component';
import { RouterModule } from '@angular/router';
import { LearningResultComponent } from './learning-translation/learning-result/learning-result.component';
import { GermanShortcutsComponent } from './learning-translation/german-shortcuts/german-shortcuts.component';
import { LearningPhaseResultComponent } from './learning-translation/learning-phase-result/learning-phase-result.component';
import { LearningFormComponent } from './learning-translation/examination/learning-form/learning-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExaminationComponent } from './learning-translation/examination/examination.component';
import { CurrentWordComponent } from './learning-translation/examination/current-word/current-word.component';
import { ResponseToAnswerComponent } from './learning-translation/response-to-answer/response-to-answer.component';
import { ScoreComponent } from './learning-translation/score/score.component';
import { LastResultComponent } from './learning-mode/last-result/last-result.component';
import { ImageComponent } from './learning-translation/image/image.component';
import { LearningFinalPageComponent } from './learning-translation/learning-final-page/learning-final-page.component';

@NgModule({
  declarations: [
    LearningModeComponent,
    PacketTableComponent,
    LearningModeSelectorComponent,
    LearningTranslationComponent,
    LearningResultComponent,
    GermanShortcutsComponent,
    LearningPhaseResultComponent,
    LearningFormComponent,
    CurrentWordComponent,
    ExaminationComponent,
    ResponseToAnswerComponent,
    ScoreComponent,
    LastResultComponent,
    ImageComponent,
    LearningFinalPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LearningModule {}
