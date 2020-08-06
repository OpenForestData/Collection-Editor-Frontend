import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '@app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, AuthRoutingModule],
  declarations: [AuthComponent, LoginComponent],
})
export class AuthModule {}
