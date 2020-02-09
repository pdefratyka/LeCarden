import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWordComponent } from './add-word/add-word.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddWordFormComponent } from './add-word/add-word-form/add-word-form.component';
import { DisplayWordComponent } from './display-word/display-word.component';
import { WordTableComponent } from './display-word/word-table/word-table.component';
import { WordFilterComponent } from './display-word/word-filter/word-filter.component';

@NgModule({
  declarations: [AddWordComponent, AddWordFormComponent, DisplayWordComponent, WordTableComponent, WordFilterComponent],
  imports: [CommonModule, SharedModule]
})
export class WordModule {}
