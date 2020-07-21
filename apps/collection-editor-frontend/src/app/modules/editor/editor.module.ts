import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { DataTablesModule } from 'angular-datatables';
import { EditorRoutingModule } from './editor-routing.module';
import { TablesListComponent } from './tables-list/tables-list.component';
import { TableNewComponent } from './table-new/table-new.component';
import { TableEditComponent } from './table-edit/table-edit.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [CommonModule, EditorRoutingModule, DataTablesModule, SharedModule],
  declarations: [EditorComponent, TablesListComponent, TableNewComponent, TableEditComponent],
})
export class EditorModule {}
