import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAuthGuard } from './auth/guards/no-auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { PrijavaComponent } from './auth/prijava/prijava.component';
import { RegistracijaComponent } from './auth/registracija/registracija.component';
import { MojiDokumentiComponent } from './moji-dokumenti/moji-dokumenti.component';
import { PodnosenjeZalbeNaCutanjeComponent } from './podnosenje-zalbe-na-cutanje/podnosenje-zalbe-na-cutanje.component';
import { PodnosenjeZalbeNaOdlukuComponent } from './podnosenje-zalbe-na-odluku/podnosenje-zalbe-na-odluku.component';
import { PrikazResenjaComponent } from './prikaz-resenja/prikaz-resenja.component';
import { PrikazZalbaCutanjeComponent } from './prikaz-zalba-cutanje/prikaz-zalba-cutanje.component';
import { PrikazZalbaNaOdlukuComponent } from './prikaz-zalba-na-odluku/prikaz-zalba-na-odluku.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ResenjaComponent } from './resenja/resenja.component';
import { ZahtevPrikazComponent } from './zahtev-prikaz/zahtev-prikaz.component';
import { ZalbaCutanjeComponent } from './zalba-cutanje/zalba-cutanje.component';
import { ZalbaNaOdlukuComponent } from './zalba-na-odluku/zalba-na-odluku.component';
import { IzvestajPrikazComponent } from './izvestaj-prikaz/izvestaj-prikaz.component';
import { OdlukaZalbiComponent } from './odluka-zalbi/odluka-zalbi.component';
import { DokumentPretragaComponent } from './dokument-pretraga/dokument-pretraga.component';

const routes: Routes = [
  {
    path: "", component: DokumentPretragaComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'role'
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
    path: "podnosenje-zalbe-na-odluku", component: PodnosenjeZalbeNaOdlukuComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'gradjanin'
    }
  },
  {
    path: "podnosenje-zalbe-na-cutanje", component: PodnosenjeZalbeNaCutanjeComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'gradjanin'
    }
  },
  {
    path: "nova-zalba-na-cutanje/:id", component: ZalbaCutanjeComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'gradjanin'
    }
  },
  {
    path: "nova-zalba-na-odluku/:id", component: ZalbaNaOdlukuComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'gradjanin'
    }
  },
  {
    path: "zalbe-cutanje/:id", component: PrikazZalbaCutanjeComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'gradjanin|poverenik'
    }
  },
  {
    path: "zalbe-na-odluku/:id", component: PrikazZalbaNaOdlukuComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'gradjanin|poverenik'
    }
  },
  {
    path: "zahtev/:id", component: ZahtevPrikazComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'gradjanin'
    }
  },
  {
    path: "moji-dokumenti", component: MojiDokumentiComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'gradjanin'
    }
  },
  {
    path: "pregled-dokumenata", component: DokumentPretragaComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'poverenik'
    }
  },
  {
    path: "resenja/:id", component: PrikazResenjaComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'poverenik'
    }
  },
  {
    path: "izvestaji/:id", component: IzvestajPrikazComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'poverenik'
    }
  },
  {
    path: "novo-resenje/:tip/:idZalbe", component: ResenjaComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'poverenik'
    }
  },
  {
    path: "odluci-zalbe", component: OdlukaZalbiComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'poverenik'
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
