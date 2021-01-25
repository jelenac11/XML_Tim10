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
import { ZahtevPrikazComponent } from './zahtev-prikaz/zahtev-prikaz.component';
import { ObavestenjePrikazComponent } from './obavestenje-prikaz/obavestenje-prikaz.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DokumentiComponent } from './dokumenti/dokumenti.component';

@NgModule({
  declarations: [
    AppComponent,
    ZahtevComponent,
    ObavestenjeComponent,
    ZahtevPrikazComponent,
    ObavestenjePrikazComponent,
    DokumentiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AuthModule,
    MatSnackBarModule,
  ],
  providers: [ZahtevService, ObavestenjeService, ZahtevXonomyService, ObavestenjeXonomyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
