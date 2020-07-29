import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListHistoryComponent } from './list-history/list-history.component';

/**
 * Editor routes
 */
const routes: Routes = [
  {
    path: '',
    component: ListHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule {}
