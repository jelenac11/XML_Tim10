import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisnikService } from '../core/services/korisnik.service';
import { ResenjaService } from '../core/services/resenja.service';
import { ZalbaCutanjeService } from '../core/services/zalba-cutanje.service';
import { ZalbaNaOdlukuService } from '../core/services/zalba-na-odluku.service';
import { ResenjaXonomyService } from '../core/xonomy/resenja-xonomy.service';
import { Snackbar } from '../shared/snackbars/snackbar/snackbar';

declare const Xonomy: any;
declare var require: any;

@Component({
  selector: 'app-resenja',
  templateUrl: './resenja.component.html',
  styleUrls: ['./resenja.component.scss']
})
export class ResenjaComponent implements OnInit {

  public user = null;
  public idZalbe;
  public tip;
  ime_podnosioca: string;
  prezime_podnosioca: string;
  naziv_podnosioca: string;
  mesto_podnosioca: string;
  ulica_podnosioca: string;
  broj_podnosioca: string;
  naziv_organa: string;
  datum_zalbe: string;
  zalilac: string;
  tip_podnosioca: string;
  tipResenja: string;

  constructor(
    private xonomyService: ResenjaXonomyService,
    private resenjeService: ResenjaService,
    private korisnikService: KorisnikService,
    private route: ActivatedRoute,
    private zalbaNaOdlukuService: ZalbaNaOdlukuService,
    private zalbaCutanjeService: ZalbaCutanjeService,
    private snackBar: Snackbar,
    private router: Router,
  ) { }

  @ViewChild('resenjeXonomy', { static: false }) resenjeXonomy;
  @ViewChild('resenjeHTML', { static: false }) resenjeHTML;

  ngOnInit(): void {
    this.tip = this.route.snapshot.params['tip'];
    this.idZalbe = this.route.snapshot.params['idZalbe'];
    if (this.tip === 'odluka'){
      this.tipResenja = "tip_rešenja='žalba_na_odluku'";
      this.zalbaNaOdluku();
    }
    else{
      this.tipResenja = "tip_rešenja='žalba_ćutanja'";
      this.zalbaCutanja();
    }
    this.korisnikService.getTrenutnoUlogovan().subscribe(res => {
      const convert = require('xml-js');
      this.user = convert.xml2js(res, { ignoreComment: true, compact: true }).korisnik;
    });
  }

  zalbaCutanja(): void {
    // tslint:disable
    this.zalbaCutanjeService.get('zalbe-cutanje', this.idZalbe).subscribe(res => {
      const convert = require('xml-js');
      const zahtev = convert.xml2js(res, { compact: true, spaces: 4 });
      console.log(zahtev);
      this.naziv_organa = zahtev['zc:zalba_na_cutanje']['zc:organ_protiv_kojeg_je_zalba']['zc:naziv']?._text;
      this.mesto_podnosioca = zahtev['zc:zalba_na_cutanje']['zc:podaci_o_zalbi']['zc:podnosilac_zalbe']['zc:lice']['common:adresa']['common:mesto']?._text;
      this.ulica_podnosioca = zahtev['zc:zalba_na_cutanje']['zc:podaci_o_zalbi']['zc:podnosilac_zalbe']['zc:lice']['common:adresa']['common:ulica']?._text;
      this.broj_podnosioca = zahtev['zc:zalba_na_cutanje']['zc:podaci_o_zalbi']['zc:podnosilac_zalbe']['zc:lice']['common:adresa']['common:broj']?._text;
      this.ime_podnosioca = zahtev['zc:zalba_na_cutanje']['zc:podaci_o_zalbi']['zc:podnosilac_zalbe']['zc:lice']['common:ime']?._text;
      this.prezime_podnosioca = zahtev['zc:zalba_na_cutanje']['zc:podaci_o_zalbi']['zc:podnosilac_zalbe']['zc:lice']['common:prezime']?._text;
      this.naziv_podnosioca = zahtev['zc:zalba_na_cutanje']['zc:podaci_o_zalbi']['zc:podnosilac_zalbe']['zc:lice']['common:naziv']?._text;
      this.datum_zalbe = zahtev['zc:zalba_na_cutanje']['zc:datum_podnosenja']?._text;
      if (this.naziv_podnosioca !== undefined) {
        this.ime_podnosioca = this.naziv_podnosioca;
        this.prezime_podnosioca = ' ';
      }
      this.kreirajXML();
    });
  }

  zalbaNaOdluku(): void {
    this.zalbaNaOdlukuService.get('zalbe-na-odluku', this.idZalbe).subscribe(res => {
      const convert = require('xml-js');
      const zahtev = convert.xml2js(res, { compact: true, spaces: 4 });
      this.naziv_organa = zahtev['zno:zalba_na_odluku']['zno:podaci_o_resenju']['zno:naziv_organa']._text;
      this.mesto_podnosioca = zahtev['zno:zalba_na_odluku']['zno:zalilac']['common:adresa']['common:mesto']._text;
      this.ulica_podnosioca = zahtev['zno:zalba_na_odluku']['zno:zalilac']['common:adresa']['common:ulica']._text;
      this.broj_podnosioca = zahtev['zno:zalba_na_odluku']['zno:zalilac']['common:adresa']['common:broj']._text;
      this.ime_podnosioca = zahtev['zno:zalba_na_odluku']['zno:zalilac']['common:ime']?._text;
      this.prezime_podnosioca = zahtev['zno:zalba_na_odluku']['zno:zalilac']['common:prezime']?._text;
      this.naziv_podnosioca = zahtev['zno:zalba_na_odluku']['zno:zalilac']['common:naziv']?._text;
      this.datum_zalbe = zahtev['zno:zalba_na_odluku']['zno:podaci_o_zalbi']['zno:datum_podnosenja']?._text;
      if (this.naziv_podnosioca !== undefined) {
        this.ime_podnosioca = this.naziv_podnosioca;
        this.prezime_podnosioca = ' ';
      }
      this.kreirajXML();
    });
  }

  kreirajXML(): void {
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
      .subscribe(res => {
        this.snackBar.success("Uspešno ste kreirali rešenje!")
        this.router.navigate(['/']);
      });

  }

  onChange(): void {
    this.resenjeHTML.nativeElement.innerHTML = this.xonomyService.convertResenjeXSLT(Xonomy.harvest());
  }
}
