import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class MaterialModule {}
