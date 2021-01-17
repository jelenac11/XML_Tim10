import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObavestenjeService } from '../core/services/obavestenje.service';
import { ZahtevService } from '../core/services/zahtev.service';
import { ObavestenjeXonomyService } from '../core/xonomy/obavestenje-xonomy.service';

declare const Xonomy: any;

@Component({
  selector: 'app-obavestenje',
  templateUrl: './obavestenje.component.html',
  styleUrls: ['./obavestenje.component.scss']
})
export class ObavestenjeComponent implements OnInit {

  private zahtev: any;

  constructor(private xonomyService: ObavestenjeXonomyService,
    private zahtevService: ZahtevService,
    private obavestenjeService: ObavestenjeService,
    private route: ActivatedRoute) { }

  @ViewChild('obavestenjeXonomy', { static: false }) obavestenjeXonomy;
  @ViewChild('obavestenjeHTML', { static: false }) obavestenjeHTML;

  ngOnInit(): void {
    this.zahtevService.get('zahtevi', this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        this.zahtev = Xonomy.xml2js(res);
        let element = document.getElementById("obavestenje");
        let xmlString = `<?xml version="1.0" encoding="UTF-8"?><ob:obavestenje xmlns:common="http://www.projekat.org/common" xmlns:ob="http://www.projekat.org/obavestenje" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" broj_zahteva='${this.obradaBrojaZahteva()}'><ob:informacije_o_obavestenju>${this.obradaOrganaiLica()}<ob:datum_obavestenja>${new Date().toISOString().slice(0, 10)}</ob:datum_obavestenja></ob:informacije_o_obavestenju><ob:zahtev>${this.obradaInformacijaOZahtevu()}</ob:zahtev><ob:odgovor_na_zahtev><ob:zahtevi>${this.obradaTrazenihZahteva()}</ob:zahtevi></ob:odgovor_na_zahtev><ob:dostavljeno></ob:dostavljeno></ob:obavestenje>`;
        Xonomy.render(xmlString, element, {
          validate: this.xonomyService.obavestenjeSpecification.validate,
          elements: this.xonomyService.obavestenjeSpecification.elements,
          onchange: () => { this.onChange() }
        });
        this.onChange();
      });
  }

  public submit(): void {
    this.obavestenjeService.post("obavestenja", Xonomy.harvest())
      .subscribe(res =>
        console.log(res)
      );
  }

  private obradaOrganaiLica(): string {
    let organTrazilac: string = Xonomy.js2xml(this.zahtev.getDescendantElements("ns2:organ")[0]);
    let lice: string = Xonomy.js2xml(this.zahtev.getDescendantElements("ns2:lice")[0]);
    organTrazilac = organTrazilac.replace("ns2:organ", "ob:organ").replace("/ns2:organ", "/ob:organ");
    organTrazilac = organTrazilac.replace("adresa", "common:adresa").replace("/adresa", "/common:adresa");
    organTrazilac = organTrazilac.replace("mesto", "common:mesto").replace("/mesto", "/common:mesto");
    organTrazilac = organTrazilac.replace("ulica", "common:ulica").replace("/ulica", "/common:ulica");
    organTrazilac = organTrazilac.replace("broj", "common:broj").replace("/broj", "/common:broj");
    organTrazilac = organTrazilac.replace("naziv", "common:naziv").replace("/naziv", "/common:naziv");
    lice = lice.replace("ns2:lice", "ob:trazilac").replace("/ns2:lice", "/ob:trazilac");
    lice = lice.replace("adresa", "common:adresa").replace("/adresa", "/common:adresa");
    lice = lice.replace("mesto", "common:mesto").replace("/mesto", "/common:mesto");
    lice = lice.replace("ulica", "common:ulica").replace("/ulica", "/common:ulica");
    lice = lice.replace("broj", "common:broj").replace("/broj", "/common:broj");
    lice = lice.replace("naziv", "common:naziv").replace("/naziv", "/common:naziv");
    lice = lice.replace("ime", "common:ime").replace("/ime", "/common:ime");
    lice = lice.replace("prezime", "common:prezime").replace("/prezime", "/common:prezime");
    lice = lice.replace("TFizicko_lice", "common:TFizicko_lice");
    lice = lice.replace("TPravno_lice", "common:TPravno_lice");
    return organTrazilac + lice;
  }
  private obradaInformacijaOZahtevu(): string {
    let informacijeOZahtevu: string = `<ob:datum_trazenja_informacija>${this.zahtev.getDescendantElements("ns2:datum")[0].getText()}</ob:datum_trazenja_informacija><ob:opis_trazene_informacije>${this.zahtev.getDescendantElements("ns2:opis_zahteva")[0].getText()}</ob:opis_trazene_informacije>`;
    return informacijeOZahtevu;
  }
  private obradaTrazenihZahteva(): string {
    let trazeneInformacije = "";
    if (this.zahtev.getDescendantElements("ns2:uvid_u_dokument")[0]) {
      trazeneInformacije += "<ob:informacije_o_uvidu status='false'/>";
    }
    if (this.zahtev.getDescendantElements("ns2:obavestenje_posedovanja_informacije")[0]) {
      trazeneInformacije += "<ob:informacije_o_posedovanju status='false'/>";
    }
    if (this.zahtev.getDescendantElements("ns2:kopiju_dokumenta")[0]) {
      trazeneInformacije += "<ob:informacije_o_izradi_kopije status='false'/>";
    }
    if (this.zahtev.getDescendantElements("ns2:dostavljanje_kopije")[0]) {
      trazeneInformacije += "<ob:informacije_o_dostavljanju_dokumenta status='false'/>";
    }
    return trazeneInformacije;
  }
  private obradaBrojaZahteva(): string {
    return this.zahtev.getAttributeValue("broj_zahteva");
  }

  onChange() {
    this.obavestenjeHTML.nativeElement.innerHTML = this.xonomyService.convertObavestenjeXSLT(Xonomy.harvest());
  }

}
