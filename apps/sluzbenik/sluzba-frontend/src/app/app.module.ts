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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DokumentPretragaComponent } from './dokument-pretraga/dokument-pretraga.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { IzvestajComponent } from './izvestaj/izvestaj.component';

@NgModule({
  declarations: [
    AppComponent,
    ZahtevComponent,
    ObavestenjeComponent,
    ZahtevPrikazComponent,
    ObavestenjePrikazComponent,
    DokumentiComponent,
    DokumentPretragaComponent,
    IzvestajComponent
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
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule
  ],
  providers: [ZahtevService, ObavestenjeService, ZahtevXonomyService, ObavestenjeXonomyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
