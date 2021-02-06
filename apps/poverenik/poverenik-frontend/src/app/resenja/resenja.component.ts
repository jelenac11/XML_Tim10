import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { KorisnikService } from '../core/services/korisnik.service';
import { ResenjaService } from '../core/services/resenja.service';
import { ResenjaXonomyService } from '../core/xonomy/resenja-xonomy.service';

declare const Xonomy: any;
declare var require: any;

@Component({
  selector: 'app-resenja',
  templateUrl: './resenja.component.html',
  styleUrls: ['./resenja.component.scss']
})
export class ResenjaComponent implements OnInit, AfterViewInit {
  public user = null;
  constructor(
    private xonomyService: ResenjaXonomyService,
    private resenjeService: ResenjaService,
    private korisnikService: KorisnikService
  ) { }

  @ViewChild('resenjeXonomy', { static: false }) resenjeXonomy;
  @ViewChild('resenjeHTML', { static: false }) resenjeHTML;

  ngOnInit(): void {
    this.korisnikService.getTrenutnoUlogovan().subscribe(res => {
      const convert = require('xml-js');
      this.user = convert.xml2js(res, {ignoreComment: true, compact: true});
    });
  }

  ngAfterViewInit(): void {
    const element = document.getElementById('resenje');
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
    <res:odluka_poverioca
        xmlns:res="http://www.projekat.org/resenje"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xs="http://www.w3.org/2001/XMLSchema#"
        xmlns:common="http://www.projekat.org/common"
        xmlns:pred="http://www.projekat.org/predicate/"
        xsi:schemaLocation="http://www.projekat.org/resenje"
        tip_rešenja=''>
        <res:opis_žalbe>
            <res:žalioc>
                <common:adresa>
                    <common:mesto></common:mesto>
                    <common:ulica></common:ulica>
                    <common:broj></common:broj>
                </common:adresa>
                <common:ime></common:ime>
                <common:prezime></common:prezime>
            </res:žalioc>
            <res:organ>
                <res:naziv></res:naziv>
                <res:adresa>
                    <common:mesto></common:mesto>
                    <common:ulica></common:ulica>
                    <common:broj></common:broj>
                </res:adresa>
            </res:organ>
            <res:datum_žalbe></res:datum_žalbe>
            <res:ceo_opis>
            </res:ceo_opis>
        </res:opis_žalbe>
        <res:rešenja>
            <res:paragraf>
            </res:paragraf>
        </res:rešenja>
        <res:obrazloženje>
            <res:opis>
                <res:paragraf>
                </res:paragraf>
            </res:opis>
            <res:razlog>
                <res:paragraf>
                </res:paragraf>
            </res:razlog>
            <res:konačno_rešenje>
                <res:paragraf>
                </res:paragraf>
            </res:konačno_rešenje>
        </res:obrazloženje>

        <res:uputstvo>
        </res:uputstvo>

        <res:datum_rešenja>${new Date().toISOString().slice(0, 10)}</res:datum_rešenja>
        <res:poverenik>
            <common:adresa>
                <common:mesto></common:mesto>
                <common:ulica></common:ulica>
                <common:broj></common:broj>
            </common:adresa>
            <common:ime></common:ime>
            <common:prezime></common:prezime>
        </res:poverenik>
    </res:odluka_poverioca>
    `;
    Xonomy.render(xmlString, element, {
      validate: this.xonomyService.resenjeSpecification.validate,
      elements: this.xonomyService.resenjeSpecification.elements,
      onchange: () => { this.onChange(); }
    });
    this.onChange();
  }

  public submit(): void {
    this.resenjeService.post(Xonomy.harvest())
      .subscribe(res => console.log(res));
  }

  onChange(): void {
    this.resenjeHTML.nativeElement.innerHTML = this.xonomyService.convertResenjeXSLT(Xonomy.harvest());
  }
}
