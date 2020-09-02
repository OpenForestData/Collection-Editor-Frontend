import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule, MatTableExporterModule, ClipboardModule],
  declarations: [ConfirmationDialogComponent],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmationDialogComponent,
    MatTableExporterModule,
    ClipboardModule,
  ],
})
export class SharedModule {}
