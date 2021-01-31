import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZalbaNaOdlukuService } from '../core/services/zalba-na-odluku.service';
import { ZalbaNaOdlukuXonomyService } from '../core/xonomy/zalba-na-odluku-xonomy.service';
import { Snackbar } from '../shared/snackbars/snackbar/snackbar';

declare const Xonomy: any;
declare var require: any;

@Component({
  selector: 'app-zalba-na-odluku',
  templateUrl: './zalba-na-odluku.component.html',
  styleUrls: ['./zalba-na-odluku.component.scss']
})
export class ZalbaNaOdlukuComponent implements OnInit {

  id: string;
  zahtev: any;
  ime_podnosioca: string;
  prezime_podnosioca: string;
  naziv_podnosioca: string;
  mesto_podnosioca: string;
  ulica_podnosioca: string;
  broj_podnosioca: string;
  naziv_organa: string;
  datum_zahteva: string;
  zalilac: string;
  tip_podnosioca: string;

  constructor(
    private xonomyService: ZalbaNaOdlukuXonomyService,
    private zalbaNaOdlukuService: ZalbaNaOdlukuService,
    private route: ActivatedRoute,
    private snackBar: Snackbar
  ) { }

  @ViewChild('zalbaXonomy', { static: false }) zalbaXonomy;
  @ViewChild('zalbaHTML', { static: false }) zalbaHTML;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.zalbaNaOdlukuService.getZahtev('zalba-na-odluku/zahtev', this.id).subscribe(res => {
      var convert = require('xml-js');
      var zahtev = convert.xml2js(res, {compact: true, spaces: 4});
      this.datum_zahteva = zahtev['za:zahtev_gradjana']['za:informacije_vezane_za_zahtev']['za:datum']._text;
      this.naziv_organa = zahtev['za:zahtev_gradjana']['za:organ']['common:naziv']._text;
      this.mesto_podnosioca = zahtev['za:zahtev_gradjana']['za:trazilac']['za:lice']['common:adresa']['common:mesto']._text;
      this.ulica_podnosioca = zahtev['za:zahtev_gradjana']['za:trazilac']['za:lice']['common:adresa']['common:ulica']._text;
      this.broj_podnosioca = zahtev['za:zahtev_gradjana']['za:trazilac']['za:lice']['common:adresa']['common:broj']._text;
      this.ime_podnosioca = zahtev['za:zahtev_gradjana']['za:trazilac']['za:lice']['common:ime']?._text;
      this.prezime_podnosioca = zahtev['za:zahtev_gradjana']['za:trazilac']['za:lice']['common:prezime']?._text;
      this.naziv_podnosioca = zahtev['za:zahtev_gradjana']['za:trazilac']['za:lice']['common:naziv']?._text;
      if (this.naziv_podnosioca === undefined) {
        this.tip_podnosioca = 'TFizicko_lice'
        this.zalilac = `<common:ime>${this.ime_podnosioca}</common:ime><common:prezime>${this.prezime_podnosioca}</common:prezime>`
      } else {
        this.tip_podnosioca = 'TPravno_lice'
        this.zalilac = `<common:naziv>${this.naziv_podnosioca}</common:naziv>`
      }
      this.kreirajXML();
    });
  }

  ngAfterViewInit(): void {
    this.kreirajXML();
  }

  kreirajXML(): void {
    let element = document.getElementById("zalbaNaOdluku");
    let xmlString = `<?xml version='1.0' encoding='UTF-8'?>
      <zno:zalba_na_odluku xmlns:common="http://www.projekat.org/common" xmlns:zno="http://www.projekat.org/zalba_na_odluku" xmlns:pred="http://www.projekat.org/predicate/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" broj_resenja="" broj_zahteva="${this.id}"><zno:adresa_poverenika><common:mesto>Београд</common:mesto><common:ulica>Булевар краља Александра</common:ulica><common:broj>15</common:broj></zno:adresa_poverenika><zno:zalilac xsi:type="common:${this.tip_podnosioca}"><common:adresa><common:mesto>${this.mesto_podnosioca}</common:mesto><common:ulica>${this.ulica_podnosioca}</common:ulica><common:broj>${this.broj_podnosioca}</common:broj></common:adresa>${this.zalilac}</zno:zalilac><zno:podaci_o_resenju><zno:godina></zno:godina><zno:naziv_organa>${this.naziv_organa}</zno:naziv_organa></zno:podaci_o_resenju><zno:datum_zahteva>${this.datum_zahteva}</zno:datum_zahteva><zno:podaci_o_zalbi><zno:podnosilac_zalbe><zno:lice><common:adresa><common:mesto></common:mesto><common:ulica></common:ulica><common:broj></common:broj></common:adresa></zno:lice><zno:drugi_podaci_za_kontakt></zno:drugi_podaci_za_kontakt></zno:podnosilac_zalbe><zno:datum_podnosenja>${new Date().toISOString().slice(0, 10)}</zno:datum_podnosenja><zno:mesto></zno:mesto><zno:opis></zno:opis></zno:podaci_o_zalbi></zno:zalba_na_odluku>`;
    Xonomy.render(xmlString, element, {
      validate: this.xonomyService.zalbaNaOdlukuSpecification.validate,
      elements: this.xonomyService.zalbaNaOdlukuSpecification.elements,
      onchange: () => { this.onChange() }
    });
    this.onChange();
  }

  onChange() {
    this.zalbaHTML.nativeElement.innerHTML = this.xonomyService.convertZalbaXSLT(Xonomy.harvest());
  }

  public submit(): void {
    this.zalbaNaOdlukuService.post("zalba-na-odluku", Xonomy.harvest())
      .subscribe(res => {
        this.snackBar.success("Uspešno ste poslali žalbu na odluku.");
        this.kreirajXML();
      },
      error => {
        this.snackBar.error("Dokument nije validan.");
      });
  }

}
