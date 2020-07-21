import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';

/**
 * Home routes
 */
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
