import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ZalbaCutanjeComponent } from './zalba-cutanje/zalba-cutanje.component';
import { ZalbaCutanjeService } from './core/services/zalba-cutanje.service';
import { ZalbaCutanjeXonomyService } from './core/xonomy/zalba-cutanje-xonomy.service';
import { ZalbaNaOdlukuComponent } from './zalba-na-odluku/zalba-na-odluku.component';
import { ZalbaNaOdlukuService } from './core/services/zalba-na-odluku.service';
import { ZalbaNaOdlukuXonomyService } from './core/xonomy/zalba-na-odluku-xonomy.service';
import { PrikazZalbaNaOdlukuComponent } from './prikaz-zalba-na-odluku/prikaz-zalba-na-odluku.component';
import { PrikazZalbaCutanjeComponent } from './prikaz-zalba-cutanje/prikaz-zalba-cutanje.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { PodnosenjeZalbeNaOdlukuComponent } from './podnosenje-zalbe-na-odluku/podnosenje-zalbe-na-odluku.component';
import { PodnosenjeZalbeNaCutanjeComponent } from './podnosenje-zalbe-na-cutanje/podnosenje-zalbe-na-cutanje.component';
import { MojiDokumentiComponent } from './moji-dokumenti/moji-dokumenti.component';
import { PregledDokumenataComponent } from './pregled-dokumenata/pregled-dokumenata.component';
import { MatButtonModule } from '@angular/material/button';
import { ZahtevPrikazComponent } from './zahtev-prikaz/zahtev-prikaz.component';
import { PrikazResenjaComponent } from './prikaz-resenja/prikaz-resenja.component';
import { ResenjaComponent } from './resenja/resenja.component';

@NgModule({
  declarations: [
    AppComponent,
    ZalbaCutanjeComponent,
    ZalbaNaOdlukuComponent,
    PrikazZalbaNaOdlukuComponent,
    PrikazZalbaCutanjeComponent,
    PodnosenjeZalbeNaOdlukuComponent,
    PodnosenjeZalbeNaCutanjeComponent,
    MojiDokumentiComponent,
    PregledDokumenataComponent,
    ZahtevPrikazComponent,
    ResenjaComponent,
    PrikazResenjaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AuthModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  providers: [ZalbaCutanjeService, ZalbaCutanjeXonomyService, ZalbaNaOdlukuService, ZalbaNaOdlukuXonomyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
