import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZalbaCutanjeComponent } from './zalba-cutanje/zalba-cutanje.component';
import { ZalbaNaOdlukuComponent } from './zalba-na-odluku/zalba-na-odluku.component';

const routes: Routes = [
  {
    path: "zalba-cutanje", component: ZalbaCutanjeComponent
  },
  {
    path: "zalba-na-odluku", component: ZalbaNaOdlukuComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
