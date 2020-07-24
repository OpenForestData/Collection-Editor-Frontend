import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';
import { TableEditComponent } from './table-edit/table-edit.component';

/**
 * Editor routes
 */
const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
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
