import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let element = document.getElementById("zalbaNaOdluku");
    let specification = this.xonomyService.zalbaNaOdlukuSpecification;
    let xmlString = `<?xml version='1.0' encoding='UTF-8'?>
      <zno:zalba_na_odluku xmlns:common="http://www.projekat.org/common" xmlns:zno="http://www.projekat.org/zalba_na_odluku" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="id0"><zno:adresa_poverenika><common:mesto></common:mesto><common:ulica></common:ulica><common:broj></common:broj></zno:adresa_poverenika><zno:zalilac><common:adresa><common:mesto></common:mesto><common:ulica></common:ulica><common:broj></common:broj></common:adresa></zno:zalilac><zno:podaci_o_resenju><zno:godina></zno:godina><zno:naziv_organa></zno:naziv_organa></zno:podaci_o_resenju><zno:datum_zahteva></zno:datum_zahteva><zno:podaci_o_zalbi><zno:podnosilac_zalbe><zno:lice><common:adresa><common:mesto></common:mesto><common:ulica></common:ulica><common:broj></common:broj></common:adresa></zno:lice><zno:drugi_podaci_za_kontakt></zno:drugi_podaci_za_kontakt></zno:podnosilac_zalbe><zno:datum_podnosenja>${new Date().toISOString().slice(0, 10)}</zno:datum_podnosenja><zno:mesto></zno:mesto><zno:opis></zno:opis></zno:podaci_o_zalbi></zno:zalba_na_odluku>`;
    Xonomy.render(xmlString, element, specification);
  }

  public submit(): void {
    this.zalbaNaOdlukuService.post("zalba-na-odluku", Xonomy.harvest())
      .subscribe(res => console.log(res));
  }

}
