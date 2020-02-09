import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWordComponent } from './add-word/add-word.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddWordFormComponent } from './add-word/add-word-form/add-word-form.component';

@NgModule({
  declarations: [AddWordComponent, AddWordFormComponent],
  imports: [CommonModule, SharedModule]
})
export class WordModule {}
