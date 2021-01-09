import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.zahtevService.get('zahtevi', this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        this.zahtev = Xonomy.xml2js(res);
        let element = document.getElementById("obavestenje");
        let specification = this.xonomyService.obavestenjeSpecification;
        let xmlString = `<?xml version="1.0" encoding="UTF-8"?><obavestenje xmlns="http://www.projekat.org/obavestenje" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" broj_zahteva='${this.obradaBrojaZahteva()}'><informacije_o_obavestenju>${this.obradaOrganaiLica()}<datum_obavestenja>${new Date().toISOString().slice(0, 10)}</datum_obavestenja></informacije_o_obavestenju><zahtev>${this.obradaInformacijaOZahtevu()}</zahtev><odgovor_na_zahtev><zahtevi>${this.obradaTrazenihZahteva()}</zahtevi></odgovor_na_zahtev><dostavljeno></dostavljeno></obavestenje>`;
        Xonomy.render(xmlString, element, specification);
      });
  }

  public submit(): void {
    this.obavestenjeService.post("obavestenja", Xonomy.harvest())
      .subscribe(res =>
        console.log(res)
      );
  }

  private obradaOrganaiLica(): string {
    let organTrazilac: string = Xonomy.js2xml(this.zahtev.getDescendantElements("organ")[0]) + Xonomy.js2xml(this.zahtev.getDescendantElements("lice")[0]);
    organTrazilac = organTrazilac.replace("lice", "trazilac").replace("/lice", "/trazilac");
    return organTrazilac;
  }
  private obradaInformacijaOZahtevu(): string {
    let informacijeOZahtevu: string = `<datum_trazenja_informacija>${this.zahtev.getDescendantElements("datum")[0].getText()}</datum_trazenja_informacija><opis_trazene_informacije>${this.zahtev.getDescendantElements("opis_zahteva")[0].getText()}</opis_trazene_informacije>`;
    return informacijeOZahtevu;
  }
  private obradaTrazenihZahteva(): string {
    let trazeneInformacije = "";
    if (this.zahtev.getDescendantElements("uvid_u_dokument")[0]) {
      trazeneInformacije += "<informacije_o_uvidu status=''/>";
    }
    if (this.zahtev.getDescendantElements("obavestenje_posedovanja_informacije")[0]) {
      trazeneInformacije += "<informacije_o_posedovanju status=''  poseduje=''/>";
    }
    if (this.zahtev.getDescendantElements("kopiju_dokumenta")[0]) {
      trazeneInformacije += "<informacije_o_izradi_kopije status=''/>";
    }
    if (this.zahtev.getDescendantElements("dostavljanje_kopije")[0]) {
      trazeneInformacije += "<informacije_o_dostavljanju_dokumenta status=''/>";
    }
    return trazeneInformacije;
  }
  private obradaBrojaZahteva(): string {
    return this.zahtev.getAttributeValue("broj_zahteva");
  }

}
