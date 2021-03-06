import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from '../core/interceptors/http.token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardsModule, WavesModule } from 'angular-bootstrap-md';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { NoAuthGuard } from './guards/no-auth.guard';
import { RoleGuard } from './guards/role.guard';


@NgModule({
  declarations: [
    RegistracijaComponent,
    PrijavaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CardsModule,
    WavesModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [RegistracijaComponent, PrijavaComponent],
  providers: [NoAuthGuard, RoleGuard, { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }]
})
export class AuthModule { }
