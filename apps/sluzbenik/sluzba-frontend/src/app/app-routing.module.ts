import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObavestenjePrikazComponent } from './obavestenje-prikaz/obavestenje-prikaz.component';
import { ObavestenjeComponent } from './obavestenje/obavestenje.component';
import { ZahtevPrikazComponent } from './zahtev-prikaz/zahtev-prikaz.component';
import { ZahtevComponent } from './zahtev/zahtev.component';

const routes: Routes = [
  {
    path: "create-zahtev", component: ZahtevComponent
  },
  {
    path: "zahtev/:id", component: ZahtevPrikazComponent
  },
  {
    path: "create-obavestenje/:id", component: ObavestenjeComponent
  },
  {
    path: "obavestenje/:id", component: ObavestenjePrikazComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
