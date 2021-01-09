import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZalbaCutanjeComponent } from './zalba-cutanje/zalba-cutanje.component';

const routes: Routes = [
  {
    path: "zalba-cutanje", component: ZalbaCutanjeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
