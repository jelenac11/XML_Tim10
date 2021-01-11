import { Component, OnInit, ViewChild } from '@angular/core';
import { ZalbaNaOdlukuService } from '../core/services/zalba-na-odluku.service';
import { ZalbaNaOdlukuXonomyService } from '../core/xonomy/zalba-na-odluku-xonomy.service';

declare const Xonomy: any;

@Component({
  selector: 'app-zalba-na-odluku',
  templateUrl: './zalba-na-odluku.component.html',
  styleUrls: ['./zalba-na-odluku.component.scss']
})
export class ZalbaNaOdlukuComponent implements OnInit {

  constructor(
    private xonomyService: ZalbaNaOdlukuXonomyService,
    private zalbaNaOdlukuService: ZalbaNaOdlukuService
  ) { }

  @ViewChild('zalbaXonomy', { static: false }) zalbaXonomy;
  @ViewChild('zalbaHTML', { static: false }) zalbaHTML;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let element = document.getElementById("zalbaNaOdluku");
    let xmlString = `<?xml version='1.0' encoding='UTF-8'?>
      <zno:zalba_na_odluku xmlns:common="http://www.projekat.org/common" xmlns:zno="http://www.projekat.org/zalba_na_odluku" xmlns:pred="http://www.projekat.org/predicate/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" broj_resenja="" about="http://www.projekat.org/zalbe_na_odluku/" vocab="http://www.projekat.org/predicate" broj_zahteva=""><zno:adresa_poverenika><common:mesto>Београд</common:mesto><common:ulica>Булевар краља Александра</common:ulica><common:broj>15</common:broj></zno:adresa_poverenika><zno:zalilac><common:adresa><common:mesto></common:mesto><common:ulica></common:ulica><common:broj></common:broj></common:adresa></zno:zalilac><zno:podaci_o_resenju><zno:godina></zno:godina><zno:naziv_organa property="pred:organ_koji_je_doneo_odluku" datatype="xs:string"></zno:naziv_organa></zno:podaci_o_resenju><zno:datum_zahteva></zno:datum_zahteva><zno:podaci_o_zalbi><zno:podnosilac_zalbe property="pred:podnosilac_zalbe" id_podnosioca="korisnikneki" content="http://www.projekat.org/korisnici/korisnikneki"><zno:lice><common:adresa><common:mesto></common:mesto><common:ulica></common:ulica><common:broj></common:broj></common:adresa><common:ime></common:ime><common:prezime></common:prezime></zno:lice><zno:drugi_podaci_za_kontakt></zno:drugi_podaci_za_kontakt></zno:podnosilac_zalbe><zno:datum_podnosenja property="pred:datum_podnosenja"  datatype="xs:date">${new Date().toISOString().slice(0, 10)}</zno:datum_podnosenja><zno:mesto property="pred:mesto_podnosenja"  datatype="xs:string"></zno:mesto><zno:opis></zno:opis></zno:podaci_o_zalbi></zno:zalba_na_odluku>`;
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
    console.log(Xonomy.harvest());
    this.zalbaNaOdlukuService.post("zalba-na-odluku", Xonomy.harvest())
      .subscribe(res => console.log(res));
  }

}
