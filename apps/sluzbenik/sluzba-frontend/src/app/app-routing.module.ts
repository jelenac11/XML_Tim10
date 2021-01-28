import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAuthGuard } from './auth/guards/no-auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { PrijavaComponent } from './auth/prijava/prijava.component';
import { RegistracijaComponent } from './auth/registracija/registracija.component';
import { DokumentiComponent } from './dokumenti/dokumenti.component';
import { ObavestenjePrikazComponent } from './obavestenje-prikaz/obavestenje-prikaz.component';
import { ObavestenjeComponent } from './obavestenje/obavestenje.component';
import { ZahtevPrikazComponent } from './zahtev-prikaz/zahtev-prikaz.component';
import { ZahtevComponent } from './zahtev/zahtev.component';

const routes: Routes = [
  {
    path: "", component: DokumentiComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: 'gradjanin|sluzbenik'
    }
  },
  {
    path: "registracija", component: RegistracijaComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: "prijava", component: PrijavaComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: "novi-zahtev", component: ZahtevComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: 'gradjanin'
    }
  },
  {
    path: "zahtev/:id", component: ZahtevPrikazComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: 'gradjanin|sluzbenik'
    }
  },
  {
    path: "novo-obavestenje/:id", component: ObavestenjeComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: 'sluzbenik'
    }
  },
  {
    path: "obavestenje/:id", component: ObavestenjePrikazComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: 'gradjanin|sluzbenik'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
