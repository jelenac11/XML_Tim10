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
    let xmlString = `<?xml version='1.0' encoding='UTF-8'?><zc:zalba_na_cutanje xmlns:common="http://www.projekat.org/common" xmlns:zc="http://www.projekat.org/zalba_cutanja" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="id0"><zc:adresa_poverenika><common:mesto></common:mesto><common:ulica></common:ulica><common:broj></common:broj></zc:adresa_poverenika><zc:organ_protiv_kojeg_je_zalba><common:adresa><common:mesto></common:mesto><common:ulica></common:ulica><common:broj></common:broj></common:adresa><common:naziv></common:naziv></zc:organ_protiv_kojeg_je_zalba><zc:podaci_o_zahtevu><zc:informacije></zc:informacije><zc:datum></zc:datum><zc:zahtevi></zc:zahtevi></zc:podaci_o_zahtevu><zc:podaci_o_zalbi><zc:podnosilac_zalbe><zc:lice><common:adresa><common:mesto></common:mesto><common:ulica></common:ulica><common:broj></common:broj></common:adresa></zc:lice><zc:drugi_podaci_za_kontakt></zc:drugi_podaci_za_kontakt></zc:podnosilac_zalbe><zc:datum_podnosenja>${new Date().toISOString().slice(0, 10)}</zc:datum_podnosenja><zc:mesto></zc:mesto><zc:razlog_zalbe></zc:razlog_zalbe></zc:podaci_o_zalbi></zc:zalba_na_cutanje>`;
    Xonomy.render(xmlString, element, specification);
  }

  public submit(): void {
    this.zalbaCutanjeService.post("zalba-cutanje", Xonomy.harvest())
      .subscribe(res => console.log(res));
  }

}
