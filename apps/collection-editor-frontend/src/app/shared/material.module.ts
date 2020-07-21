import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [MatFormFieldModule, MatSelectModule, MatCardModule, MatSidenavModule],
  exports: [MatFormFieldModule, MatSelectModule, MatCardModule, MatSidenavModule],
})
export class MaterialModule {}
