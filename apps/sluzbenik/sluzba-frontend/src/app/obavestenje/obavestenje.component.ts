import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObavestenjeService } from '../core/services/obavestenje.service';
import { ZahtevService } from '../core/services/zahtev.service';
import { ObavestenjeXonomyService } from '../core/xonomy/obavestenje-xonomy.service';
import { Snackbar } from '../shared/snackbars/snackbar/snackbar';

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
    private route: ActivatedRoute,
    private snackBar: Snackbar,
    private router: Router) { }

  @ViewChild('obavestenjeXonomy', { static: false }) obavestenjeXonomy;
  @ViewChild('obavestenjeHTML', { static: false }) obavestenjeHTML;

  ngOnInit(): void {
    this.zahtevService.get('zahtevi', this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        this.zahtev = Xonomy.xml2js(res);
        let element = document.getElementById("obavestenje");
        let xmlString = `<?xml version="1.0" encoding="UTF-8"?><ob:obavestenje xmlns:common="http://www.projekat.org/common" xmlns:ob="http://www.projekat.org/obavestenje" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id_zahteva='${this.obradaBrojaZahteva()}' xmlns:pred="http://www.projekat.org/predicate/"><ob:informacije_o_obavestenju>${this.obradaOrganaiLica()}<ob:datum_obavestenja>${new Date().toISOString().slice(0, 10)}</ob:datum_obavestenja></ob:informacije_o_obavestenju><ob:zahtev>${this.obradaInformacijaOZahtevu()}</ob:zahtev><ob:odgovor_na_zahtev><ob:zahtevi>${this.obradaTrazenihZahteva()}</ob:zahtevi></ob:odgovor_na_zahtev><ob:dostavljeno><ob:imenovanom>Imenovanom</ob:imenovanom></ob:dostavljeno></ob:obavestenje>`;
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
      .subscribe(res => {
        this.succesMessage('Uspešno ste poslali zahtev.');
        this.router.navigateByUrl(`/`);
      },
        err => {
          this.errorMessage('Molimo Vas da ispravno popunite zahtev.');
        });
  };

  private succesMessage(message: string): void {
    this.snackBar.success(message);
  };

  private errorMessage(message: string): void {
    this.snackBar.error(message);
  };

  private obradaOrganaiLica(): string {
    let organTrazilac: string = Xonomy.js2xml(this.zahtev.getDescendantElements("za:organ")[0]);
    let lice: string = Xonomy.js2xml(this.zahtev.getDescendantElements("za:lice")[0]);
    lice = `<ob:trazilac 
    property="${this.zahtev.getDescendantElements("za:lice")[0].getAttributeValue('property', null)}" 
    content="${this.zahtev.getDescendantElements("za:lice")[0].getAttributeValue('content', null)}}">` + lice + "</ob:trazilac>";
    organTrazilac = organTrazilac.replace("za:organ", "ob:organ").replace("/za:organ", "/ob:organ");
    lice = lice.replace("za:lice", "ob:lice").replace("/za:lice", "/ob:lice");
    return organTrazilac + lice;
  }
  private obradaInformacijaOZahtevu(): string {
    let informacijeOZahtevu: string = `<ob:datum_trazenja_informacija>${this.zahtev.getDescendantElements("za:datum")[0].getText().substring(0,10)}</ob:datum_trazenja_informacija><ob:opis_trazene_informacije>${this.zahtev.getDescendantElements("za:opis_zahteva")[0].getText()}</ob:opis_trazene_informacije>`;
    return informacijeOZahtevu;
  }
  private obradaTrazenihZahteva(): string {
    let trazeneInformacije = "";
    if (this.zahtev.getDescendantElements("za:uvid_u_dokument")[0]) {
      trazeneInformacije += "<ob:informacije_o_uvidu/>";
    }
    if (this.zahtev.getDescendantElements("za:obavestenje_posedovanja_informacije")[0]) {
      trazeneInformacije += "<ob:informacije_o_posedovanju/>";
    }
    if (this.zahtev.getDescendantElements("za:kopiju_dokumenta")[0]) {
      trazeneInformacije += "<ob:informacije_o_izradi_kopije/>";
    }
    if (this.zahtev.getDescendantElements("za:dostavljanje_kopije")[0]) {
      trazeneInformacije += "<ob:informacije_o_dostavljanju_dokumenta/>";
    }
    return trazeneInformacije;
  }
  private obradaBrojaZahteva(): string {
    return this.zahtev.getAttributeValue("id");
  }

  onChange() {
    this.obavestenjeHTML.nativeElement.innerHTML = this.xonomyService.convertObavestenjeXSLT(Xonomy.harvest());
  }
}
