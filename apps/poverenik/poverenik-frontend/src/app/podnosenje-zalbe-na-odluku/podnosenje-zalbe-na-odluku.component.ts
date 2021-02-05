import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZalbaNaOdlukuService } from '../core/services/zalba-na-odluku.service';

declare const Xonomy: any;

@Component({
  selector: 'app-podnosenje-zalbe-na-odluku',
  templateUrl: './podnosenje-zalbe-na-odluku.component.html',
  styleUrls: ['./podnosenje-zalbe-na-odluku.component.scss']
})
export class PodnosenjeZalbeNaOdlukuComponent implements OnInit {

  zahtevi: String[] = [];

  constructor(
    private zalbaNaOdlukuService: ZalbaNaOdlukuService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOdbijeniZahtevi();
  }

  getOdbijeniZahtevi(): void {
    this.zalbaNaOdlukuService.getOdbijeniZahtevi('zalbe-na-odluku/odbijeniZahtevi').subscribe(res => {
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
    this.router.navigateByUrl(`nova-zalba-na-odluku/${zahtevId.substring(zahtevId.length - 36)}`);
  };

}
