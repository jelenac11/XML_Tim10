import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ZalbaCutanjeComponent } from './zalba-cutanje/zalba-cutanje.component';
import { ZalbaCutanjeService } from './core/services/zalba-cutanje.service';
import { ZalbaCutanjeXonomyService } from './core/xonomy/zalba-cutanje-xonomy.service';
import { ZalbaNaOdlukuComponent } from './zalba-na-odluku/zalba-na-odluku.component';
import { ZalbaNaOdlukuService } from './core/services/zalba-na-odluku.service';
import { ZalbaNaOdlukuXonomyService } from './core/xonomy/zalba-na-odluku-xonomy.service';

@NgModule({
  declarations: [
    AppComponent,
    ZalbaCutanjeComponent,
    ZalbaNaOdlukuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ZalbaCutanjeService, ZalbaCutanjeXonomyService, ZalbaNaOdlukuService, ZalbaNaOdlukuXonomyService],
  bootstrap: [AppComponent]
})
export class AppModule { }