import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZalbaCutanjeService } from '../core/services/zalba-cutanje.service';

declare const Xonomy: any;

@Component({
  selector: 'app-podnosenje-zalbe-na-cutanje',
  templateUrl: './podnosenje-zalbe-na-cutanje.component.html',
  styleUrls: ['./podnosenje-zalbe-na-cutanje.component.scss']
})
export class PodnosenjeZalbeNaCutanjeComponent implements OnInit {

  zahtevi: String[] = [];

  constructor(
    private zalbaCutanjeService: ZalbaCutanjeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOdbijeniZahtevi();
  }

  getOdbijeniZahtevi(): void {
    this.zalbaCutanjeService.getIstekliZahtevi('zalba-cutanje/istekliZahtevi').subscribe(res => {
      this.extractIds(res, this.zahtevi);
    });
  }

  extractIds(documentsId: string, collection: any[]): void {
    let zahtevi = Xonomy.xml2js(documentsId);
    zahtevi = zahtevi.getDescendantElements('item');
    for (let i = 0; i < zahtevi.length; i++) {
      collection.push(zahtevi[i].getText());
    }
  };

  podnesiZalbu(zahtevId: string): void {
    this.router.navigateByUrl(`nova-zalba-na-cutanje/${zahtevId.substring(zahtevId.length - 36)}`);
  };

}
