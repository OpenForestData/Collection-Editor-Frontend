import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListHistoryComponent } from '@app/modules/history/list-history/list-history.component';
import { HistoryComponent } from '@app/modules/history/history.component';

/**
 * Editor routes
 */
const routes: Routes = [
  {
    path: '',
    component: HistoryComponent,
    children: [
      {
        path: '',
        component: ListHistoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule {}
