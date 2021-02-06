import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZahtevService } from '../core/services/zahtev.service';

declare const Xonomy: any;
declare var require: any;

@Component({
  selector: 'app-prikaz-zalba-cutanje',
  templateUrl: './prikaz-zalba-cutanje.component.html',
  styleUrls: ['./prikaz-zalba-cutanje.component.scss']
})
export class PrikazZalbaCutanjeComponent implements OnInit {

  id: string;
  zalba: any;

  constructor(
    private zahtevService: ZahtevService,
    private route: ActivatedRoute
  ) { }

  @ViewChild('zalbaHTML', { static: false }) zalbaHTML;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.zahtevService.get('zahtevi/XSLTZalbaCutanje', this.id).subscribe(res => {
      var convert = require('xml-js');
      var htmlZahtev = convert.xml2js(res, { compact: true, spaces: 4 });
      this.zalbaHTML.nativeElement.innerHTML = htmlZahtev.xsltRoot.xslt._text;
    });
  }
}
