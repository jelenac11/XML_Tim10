import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZahtevComponent } from './zahtev/zahtev.component';
import { ZahtevService } from './core/services/zahtev.service';
import { HttpClientModule } from '@angular/common/http';
import { ObavestenjeComponent } from './obavestenje/obavestenje.component';
import { ObavestenjeService } from './core/services/obavestenje.service';
import { ZahtevXonomyService } from './core/xonomy/zahtev-xonomy.service';
import { ObavestenjeXonomyService } from './core/xonomy/obavestenje-xonomy.service';

@NgModule({
  declarations: [
    AppComponent,
    ZahtevComponent,
    ObavestenjeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ZahtevService, ObavestenjeService, ZahtevXonomyService, ObavestenjeXonomyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
