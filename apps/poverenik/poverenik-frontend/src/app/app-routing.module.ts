import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAuthGuard } from './auth/guards/no-auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { PrijavaComponent } from './auth/prijava/prijava.component';
import { RegistracijaComponent } from './auth/registracija/registracija.component';
import { PrikazZalbaCutanjeComponent } from './prikaz-zalba-cutanje/prikaz-zalba-cutanje.component';
import { PrikazZalbaNaOdlukuComponent } from './prikaz-zalba-na-odluku/prikaz-zalba-na-odluku.component';
import { ZalbaCutanjeComponent } from './zalba-cutanje/zalba-cutanje.component';
import { ZalbaNaOdlukuComponent } from './zalba-na-odluku/zalba-na-odluku.component';

const routes: Routes = [
  {
    path: "", component: ZalbaCutanjeComponent //ovde ce inace da ide na moji dokumenti kad se napravi ta stranica i treba da ima rolu gradjanin
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
    path: "nova-zalba-cutanje", component: ZalbaCutanjeComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'gradjanin'
    }
  },
  {
    path: "nova-zalba-na-odluku", component: ZalbaNaOdlukuComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'gradjanin'
    }
  },
  {
    path: "zalba-cutanje/:id", component: PrikazZalbaCutanjeComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'gradjanin|poverenik'
    }
  },
  {
    path: "zalba-na-odluku/:id", component: PrikazZalbaNaOdlukuComponent,
    canActivate: [RoleGuard],
    data: {
        expectedRoles: 'gradjanin|poverenik'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
