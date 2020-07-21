import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from '@app/core/layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'list',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
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
