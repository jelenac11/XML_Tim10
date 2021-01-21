import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { KorisnikService } from './services/korisnik.service';
import { ObavestenjeService } from './services/obavestenje.service';
import { ZahtevService } from './services/zahtev.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    KorisnikService,
    ObavestenjeService,
    ZahtevService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    }
  ],
  exports: []
})
export class CoreModule { }
