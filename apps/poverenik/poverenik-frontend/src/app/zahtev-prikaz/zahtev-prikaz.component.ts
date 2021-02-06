import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZalbaNaOdlukuService } from '../core/services/zalba-na-odluku.service';

declare const Xonomy: any;
declare var require: any;

@Component({
  selector: 'app-zahtev-prikaz',
  templateUrl: './zahtev-prikaz.component.html',
  styleUrls: ['./zahtev-prikaz.component.scss']
})
export class ZahtevPrikazComponent implements OnInit {

  id: string;
  zahtev: any;

  @ViewChild('zahtevHTML', { static: false }) zahtevHTML;

  constructor(
    private zalbaNaOdlukuService: ZalbaNaOdlukuService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.zalbaNaOdlukuService.getXSLTZahtev('zalbe-na-odluku/XSLTZahtev', this.id).subscribe(res => {
      var convert = require('xml-js');
      var htmlZahtev = convert.xml2js(res, {compact: true, spaces: 4});
      this.zahtevHTML.nativeElement.innerHTML = htmlZahtev.xsltRoot.xslt._text;
    });
  }

}
