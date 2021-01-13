import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObavestenjeComponent } from './obavestenje/obavestenje.component';
import { ZahtevPrikazComponent } from './zahtev-prikaz/zahtev-prikaz.component';
import { ZahtevComponent } from './zahtev/zahtev.component';

const routes: Routes = [
  {
    path: "zahtev", component: ZahtevComponent
  },
  {
    path: "zahtev/:id", component: ZahtevPrikazComponent
  },
  {
    path: "obavestenje/:id", component: ObavestenjeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
