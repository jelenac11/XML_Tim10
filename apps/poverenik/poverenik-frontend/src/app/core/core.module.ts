import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { KorisnikService } from './services/korisnik.service';
import { ZalbaCutanjeService } from './services/zalba-cutanje.service';
import { ZalbaNaOdlukuService } from './services/zalba-na-odluku.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    KorisnikService,
    ZalbaCutanjeService,
    ZalbaNaOdlukuService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    }
  ],
  exports: []
})
export class CoreModule { }
