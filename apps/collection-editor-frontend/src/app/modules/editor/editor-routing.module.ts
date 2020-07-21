import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';

/**
 * Home routes
 */
const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
