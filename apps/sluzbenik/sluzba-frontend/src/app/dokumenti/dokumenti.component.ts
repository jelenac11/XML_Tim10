import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../core/services/jwt.service';
import { ObavestenjeService } from '../core/services/obavestenje.service';
import { ZahtevService } from '../core/services/zahtev.service';

declare const Xonomy: any;

@Component({
  selector: 'app-dokumenti',
  templateUrl: './dokumenti.component.html',
  styleUrls: ['./dokumenti.component.scss']
})
export class DokumentiComponent implements OnInit {

  dokumenta: String[] = [];
  role: String;

  constructor(private zahtevService: ZahtevService,
    private obavestenjeService: ObavestenjeService,
    private jwtService: JwtService,
    private router: Router) { }

  ngOnInit(): void {
    this.role = this.jwtService.getRole();
    if (this.role == 'gradjanin') {
      this.getAllGradjanin();
    }
    else {
      this.getAllSluzbenik();
    }
  };

  getAllGradjanin(): void {
    this.zahtevService.getAllDocumentsIdByGradjanin('zahtevi').subscribe(res => {
      this.extractIds(res);
    });
    this.obavestenjeService.getAllDocumentsIdByGradjanin('obavestenja').subscribe(res => {
      this.extractIds(res);
    })
  };

  getAllSluzbenik(): void {
    this.obavestenjeService.getAllDocumentsIdByGradjanin('zahtevi/unanswered-zahtevi').subscribe(res => {
      this.extractIds(res);
    })
  };

  extractIds(documentsId: string): void {
    let zahtevi = Xonomy.xml2js(documentsId);
    zahtevi = zahtevi.getDescendantElements('zahtev');
    for (let i = 0; i < zahtevi.length; i++) {
      this.dokumenta.push(zahtevi[i].getText());
    }
  };

  odbijZahtev(zahtevId: string): void {
    let dokument = `<zahtevi><zahtev>${zahtevId}</zahtev></zahtevi>`;
    this.zahtevService.put(`zahtevi`, dokument).subscribe(res => {

    }, err => {
      console.log(err);
    });
  };

  prihvatiZahtev(zahtevId: string): void {
    this.router.navigateByUrl(`/novo-obavestenje/${zahtevId}`);
  }

}
