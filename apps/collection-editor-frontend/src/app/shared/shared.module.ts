import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  declarations: [],
  exports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
