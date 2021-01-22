import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule, IconsModule, NavbarModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Snackbar } from './snackbars/snackbar/snackbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    IconsModule,
    ReactiveFormsModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonsModule,
    MatDialogModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [Snackbar]
})
export class SharedModule { }
