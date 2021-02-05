import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZalbaCutanjeService } from '../core/services/zalba-cutanje.service';
import { ZalbaCutanjeXonomyService } from '../core/xonomy/zalba-cutanje-xonomy.service';
import { Snackbar } from '../shared/snackbars/snackbar/snackbar';

declare const Xonomy: any;
declare var require: any;

@Component({
  selector: 'app-zalba-cutanje',
  templateUrl: './zalba-cutanje.component.html',
  styleUrls: ['./zalba-cutanje.component.scss']
})
export class ZalbaCutanjeComponent implements OnInit {

  id: string;
  zahtev: any;
  naziv_organa: string;
  mesto_organa: string;
  ulica_organa: string;
  broj_organa: string;
  datum_zahteva: string;

  constructor(
    private xonomyService: ZalbaCutanjeXonomyService,
    private zalbaCutanjeService: ZalbaCutanjeService,
    private route: ActivatedRoute,
    private snackBar: Snackbar
  ) { }

  @ViewChild('zalbaXonomy', { static: false }) zalbaXonomy;
  @ViewChild('zalbaHTML', { static: false }) zalbaHTML;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.zalbaCutanjeService.getZahtev('zalbe-cutanje/zahtev', this.id).subscribe(res => {
      var convert = require('xml-js');
      var zahtev = convert.xml2js(res, {compact: true, spaces: 4});
      this.datum_zahteva = zahtev['za:zahtev_gradjana']['za:informacije_vezane_za_zahtev']['za:datum']._text.substring(0,10);
      this.naziv_organa = zahtev['za:zahtev_gradjana']['za:organ']['common:naziv']._text;
      this.mesto_organa = zahtev['za:zahtev_gradjana']['za:organ']['common:adresa']['common:mesto']._text;
      this.ulica_organa = zahtev['za:zahtev_gradjana']['za:organ']['common:adresa']['common:ulica']._text;
      this.broj_organa = zahtev['za:zahtev_gradjana']['za:organ']['common:adresa']['common:broj']._text;
      this.kreirajXML();
    });
  }

  ngAfterViewInit(): void {
    this.kreirajXML();
  }

  kreirajXML(): void {
    let element = document.getElementById("zalbaCutanje");
    let xmlString = `<?xml version='1.0' encoding='UTF-8'?><zc:zalba_na_cutanje xmlns:common="http://www.projekat.org/common" xmlns:zc="http://www.projekat.org/zalba_cutanja" xmlns:pred="http://www.projekat.org/predicate/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" broj_zahteva="${this.id}"><zc:adresa_poverenika><common:mesto>Београд</common:mesto><common:ulica>Булевар краља Александра</common:ulica><common:broj>15</common:broj></zc:adresa_poverenika><zc:organ_protiv_kojeg_je_zalba><common:adresa><common:mesto>${this.mesto_organa}</common:mesto><common:ulica>${this.ulica_organa}</common:ulica><common:broj>${this.broj_organa}</common:broj></common:adresa><common:naziv>${this.naziv_organa}</common:naziv></zc:organ_protiv_kojeg_je_zalba><zc:podaci_o_zahtevu><zc:informacije></zc:informacije><zc:datum>${this.datum_zahteva}</zc:datum><zc:zahtevi></zc:zahtevi></zc:podaci_o_zahtevu><zc:podaci_o_zalbi><zc:podnosilac_zalbe><zc:lice><common:adresa><common:mesto></common:mesto><common:ulica></common:ulica><common:broj></common:broj></common:adresa></zc:lice><zc:drugi_podaci_za_kontakt></zc:drugi_podaci_za_kontakt></zc:podnosilac_zalbe><zc:datum_podnosenja>${new Date().toISOString().slice(0, 10)}</zc:datum_podnosenja><zc:mesto></zc:mesto><zc:razlog_zalbe></zc:razlog_zalbe></zc:podaci_o_zalbi></zc:zalba_na_cutanje>`;
    Xonomy.render(xmlString, element, {
      validate: this.xonomyService.zalbaCutanjeSpecification.validate,
      elements: this.xonomyService.zalbaCutanjeSpecification.elements,
      onchange: () => { this.onChange() }
    });
    this.onChange();
  }

  public submit(): void {
    console.log(Xonomy.harvest())
    this.zalbaCutanjeService.post("zalbe-cutanje", Xonomy.harvest())
      .subscribe(res => {
        this.snackBar.success("Uspešno ste poslali žalbu na ćutanje.");
        this.kreirajXML();
      },
      error => {
        this.snackBar.error("Dokument nije validan.");
      });
  }

  onChange() {
    this.zalbaHTML.nativeElement.innerHTML = this.xonomyService.convertZalbaXSLT(Xonomy.harvest());
  }

}
