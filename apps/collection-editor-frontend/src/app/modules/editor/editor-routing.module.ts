import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableEditComponent } from './table-edit/table-edit.component';
import { TablesListComponent } from '@app/modules/editor/tables-list/tables-list.component';

/**
 * Editor routes
 */
const routes: Routes = [
  {
    path: '',
    component: TablesListComponent,
  },
  {
    path: 'edit/:id',
    component: TableEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
