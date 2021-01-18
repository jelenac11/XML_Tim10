import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrijavaComponent } from './auth/prijava/prijava.component';
import { RegistracijaComponent } from './auth/registracija/registracija.component';
import { PrikazZalbaCutanjeComponent } from './prikaz-zalba-cutanje/prikaz-zalba-cutanje.component';
import { PrikazZalbaNaOdlukuComponent } from './prikaz-zalba-na-odluku/prikaz-zalba-na-odluku.component';
import { ZalbaCutanjeComponent } from './zalba-cutanje/zalba-cutanje.component';
import { ZalbaNaOdlukuComponent } from './zalba-na-odluku/zalba-na-odluku.component';

const routes: Routes = [
  {
    path: "registracija", component: RegistracijaComponent
  },
  {
    path: "prijava", component: PrijavaComponent
  },
  {
    path: "nova-zalba-cutanje", component: ZalbaCutanjeComponent
  },
  {
    path: "nova-zalba-na-odluku", component: ZalbaNaOdlukuComponent
  },
  {
    path: "zalba-cutanje/:id", component: PrikazZalbaCutanjeComponent
  },
  {
    path: "zalba-na-odluku/:id", component: PrikazZalbaNaOdlukuComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
