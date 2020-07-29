import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from '@app/core/layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './core/guards/auth.guard';

/**
 * App routes
 */
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'history',
        loadChildren: () => import('./modules/history/history.module').then((m) => m.HistoryModule),
      },
      {
        path: 'list',
        loadChildren: () => import('./modules/editor/editor.module').then((m) => m.EditorModule),
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
