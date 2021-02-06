import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAuthGuard } from './auth/guards/no-auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { PrijavaComponent } from './auth/prijava/prijava.component';
import { RegistracijaComponent } from './auth/registracija/registracija.component';
import { DokumentPretragaComponent } from './dokument-pretraga/dokument-pretraga.component';
import { DokumentiComponent } from './dokumenti/dokumenti.component';
import { IzvestajPrikazComponent } from './izvestaj-prikaz/izvestaj-prikaz.component';
import { IzvestajComponent } from './izvestaj/izvestaj.component';
import { ObavestenjePrikazComponent } from './obavestenje-prikaz/obavestenje-prikaz.component';
import { ObavestenjeComponent } from './obavestenje/obavestenje.component';
import { PrikazResenjaComponent } from './prikaz-resenja/prikaz-resenja.component';
import { PrikazZalbaCutanjeComponent } from './prikaz-zalba-cutanje/prikaz-zalba-cutanje.component';
import { PrikazZalbaNaOdlukuComponent } from './prikaz-zalba-na-odluku/prikaz-zalba-na-odluku.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
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
  {
    path:"pretraga-dokumenata", component: DokumentPretragaComponent,
    canActivate: [RoleGuard],
    data:{
      expectedRoles: 'sluzbenik'
    }
  },
  {
    path:"izvestaji/:id", component: IzvestajPrikazComponent,
    canActivate: [RoleGuard],
    data:{
      expectedRoles: 'sluzbenik'
    }
  },
  {
    path:"podnosenje-izvestaja", component: IzvestajComponent,
    canActivate: [RoleGuard],
    data:{
      expectedRoles: 'sluzbenik'
    }
  },
  {
    path:"zalba-odgovor/:tip/:id/:idZalbe", component: ObavestenjeComponent,
    canActivate: [RoleGuard],
    data:{
      expectedRoles: 'sluzbenik'
    }
  },
  {
    path:"zalbe-cutanje/:id", component: PrikazZalbaCutanjeComponent,
    canActivate: [RoleGuard],
    data:{
      expectedRoles: 'sluzbenik'
    }
  },
  {
    path:"zalbe-na-odluku/:id", component: PrikazZalbaNaOdlukuComponent,
    canActivate: [RoleGuard],
    data:{
      expectedRoles: 'sluzbenik'
    }
  },
  {
    path:"resenja/:id", component: PrikazResenjaComponent,
    canActivate: [RoleGuard],
    data:{
      expectedRoles: 'sluzbenik'
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
