import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  declarations: [ConfirmationDialogComponent],
  exports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule, ConfirmationDialogComponent],
})
export class SharedModule {}
