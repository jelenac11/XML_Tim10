import { Component, OnInit } from '@angular/core';
import { ZalbaCutanjeService } from '../core/services/zalba-cutanje.service';
import { ZalbaCutanjeXonomyService } from '../core/xonomy/zalba-cutanje-xonomy.service';

declare const Xonomy: any;

@Component({
  selector: 'app-zalba-cutanje',
  templateUrl: './zalba-cutanje.component.html',
  styleUrls: ['./zalba-cutanje.component.scss']
})
export class ZalbaCutanjeComponent implements OnInit {

  constructor(
    private xonomyService: ZalbaCutanjeXonomyService,
    private zalbaCutanjeService: ZalbaCutanjeService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let element = document.getElementById("zalbaCutanje");
    let specification = this.xonomyService.zalbaCutanjeSpecification;
    let xmlString = `<?xml version='1.0' encoding='UTF-8'?><zc:zalba_na_cutanje xmlns:common="http://www.projekat.org/common" xmlns:zc="http://www.projekat.org/zalba_cutanja" xmlns:pred="http://www.projekat.org/predicate/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" about="http://www.projekat.org/zalbe_na_cutanje/" vocab="http://www.projekat.org/predicate" broj_zahteva=""><zc:adresa_poverenika><common:mesto>Београд</common:mesto><common:ulica>Булевар краља Александра</common:ulica><common:broj>15</common:broj></zc:adresa_poverenika><zc:organ_protiv_kojeg_je_zalba property="pred:organ_protiv_kojeg_je_zalba" content="http://www.projekat.org/organi/"><common:adresa><common:mesto></common:mesto><common:ulica></common:ulica><common:broj></common:broj></common:adresa><common:naziv></common:naziv></zc:organ_protiv_kojeg_je_zalba><zc:podaci_o_zahtevu><zc:informacije></zc:informacije><zc:datum></zc:datum><zc:zahtevi></zc:zahtevi></zc:podaci_o_zahtevu><zc:podaci_o_zalbi><zc:podnosilac_zalbe property="pred:podnosilac_zalbe" id_podnosioca="nekikorisnik" content="http://www.projekat.org/korisnici/nekikorisnik"><zc:lice><common:adresa><common:mesto></common:mesto><common:ulica></common:ulica><common:broj></common:broj></common:adresa><common:ime></common:ime><common:prezime></common:prezime></zc:lice><zc:drugi_podaci_za_kontakt></zc:drugi_podaci_za_kontakt></zc:podnosilac_zalbe><zc:datum_podnosenja property="pred:datum_podnosenja" datatype="xs:date">${new Date().toISOString().slice(0, 10)}</zc:datum_podnosenja><zc:mesto property="pred:mesto_podnosenja" datatype="xs:string"></zc:mesto><zc:razlog_zalbe></zc:razlog_zalbe></zc:podaci_o_zalbi></zc:zalba_na_cutanje>`;
    Xonomy.render(xmlString, element, specification);
  }

  public submit(): void {
    console.log(Xonomy.harvest())
    this.zalbaCutanjeService.post("zalba-cutanje", Xonomy.harvest())
      .subscribe(res => console.log(res));
  }

}
