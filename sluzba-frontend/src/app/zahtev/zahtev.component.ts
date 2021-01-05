import { Component, OnInit } from '@angular/core';
import { ZahtevService } from '../core/services/zahtev.service';
import { ZahtevXonomyService } from '../core/xonomy/zahtev-xonomy.service';

declare const Xonomy: any;

@Component({
  selector: 'app-zahtev',
  templateUrl: './zahtev.component.html',
  styleUrls: ['./zahtev.component.scss']
})
export class ZahtevComponent implements OnInit {

  constructor(private xonomyService: ZahtevXonomyService,
    private zahtevService: ZahtevService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let element = document.getElementById("zahtev");
    let specification = this.xonomyService.zahtevGradjanaSpecification;
    let xmlString = `<?xml version='1.0' encoding='UTF-8'?><zahtev_gradjana xmlns="http://www.projekat.org/zahtev" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><organ><adresa><mesto></mesto></adresa><naziv></naziv></organ><trazilac><lice/><drugi_podatak_za_kontakt></drugi_podatak_za_kontakt></trazilac><informacije_vezane_za_zahtev><tip_zahteva></tip_zahteva><opis_zahteva></opis_zahteva><mesto></mesto><datum>${new Date().toISOString().slice(0, 10)}</datum></informacije_vezane_za_zahtev></zahtev_gradjana>`;
    Xonomy.render(xmlString, element, specification);
  }

  public submit(): void {
    this.zahtevService.post("zahtevi", Xonomy.harvest())
      .subscribe(res =>
        console.log(res));
  }
}
