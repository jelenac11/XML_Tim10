import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../core/services/jwt.service';
import { ObavestenjeService } from '../core/services/obavestenje.service';
import { ZahtevService } from '../core/services/zahtev.service';
import { Snackbar } from '../shared/snackbars/snackbar/snackbar';

declare const Xonomy: any;

@Component({
  selector: 'app-dokumenti',
  templateUrl: './dokumenti.component.html',
  styleUrls: ['./dokumenti.component.scss']
})
export class DokumentiComponent implements OnInit {

  role: String;
  zahtevi: String[] = [];
  obavestenja: String[] = [];
  izvestaji: String[] = [];
  zalbeZahtevi = [];

  constructor(private zahtevService: ZahtevService,
    private obavestenjeService: ObavestenjeService,
    private jwtService: JwtService,
    private router: Router,
    private snackBar: Snackbar) { }

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
    this.zahtevService.getAll('zahtevi').subscribe(res => {
      this.extractIds(res, this.zahtevi);
    });
    this.obavestenjeService.getAllDocumentsIdByGradjanin('obavestenja').subscribe(res => {
      this.extractIds(res, this.obavestenja);
    })
  };

  getAllSluzbenik(): void {
    this.obavestenjeService.getAllDocumentsIdByGradjanin('zahtevi/unanswered-zahtevi').subscribe(res => {
      this.zahtevi = [];
      this.extractIds(res, this.zahtevi);
    });
    this.zahtevService.getAll('zahtevi/zalbe-zahtevi').subscribe(res => {
      let zahtevi = Xonomy.xml2js(res);
      zahtevi = zahtevi.getDescendantElements('item');
      this.zalbeZahtevi = [];
      for (let i = 0; i < zahtevi.length; i++) {

        const txt = zahtevi[i].getText().split('|');
        const idZalbe = txt[0];
        const idZahteva = txt[1];
        const tip = txt[2];
        this.zalbeZahtevi.push({ idZalbe, idZahteva, tip });
      }
    });
  };

  extractIds(documentsId: string, collection: any[]): void {
    let zahtevi = Xonomy.xml2js(documentsId);
    zahtevi = zahtevi.getDescendantElements('zahtev');
    for (let i = 0; i < zahtevi.length; i++) {
      collection.push(zahtevi[i].getText());
    }
  };

  odbijZahtev(zahtevId: string): void {
    let dokument = `<zahtevi><zahtev>${zahtevId}</zahtev></zahtevi>`;
    this.zahtevService.put(`zahtevi`, dokument).subscribe(res => {
      this.zahtevi = [];
      this.getAllSluzbenik();
      this.succesMessage('Zahtev je uspešno odbijen.');
    }, err => {
      this.errorMessage('Došlo je do greške prilikom odbijanja zahteva. Pokušajte ponovo.');
    });
  };

  prihvatiZahtev(zahtevId: string): void {
    this.router.navigateByUrl(`/novo-obavestenje/${zahtevId}`);
  };

  odbijZahtevZalbe(zahtev: any): void {
    this.zahtevService.zalba('zahtevi/odbi-zalbu/' + zahtev.tip + '/' + zahtev.idZalbe).subscribe(() => {
      this.getAllSluzbenik();
    });
  };

  prihvatiZahtevZalbe(zahtev: any): void {
    this.router.navigateByUrl(`/zalba-odgovor/${zahtev.tip}/${zahtev.idZahteva.split("/")[4]}/${zahtev.idZalbe}`);
  };

  zahtev(zahtev: any): void {
    console.log(zahtev);
    if (zahtev.tip == 'odluka') {
      this.router.navigateByUrl(`/zalba-na-odluku/${zahtev.idZalbe}`);
    }
    else {
      this.router.navigateByUrl(`/zalba-cutanje/${zahtev.idZalbe}`);
    }
  }

  private succesMessage(message: string): void {
    this.snackBar.success(message);
  };

  private errorMessage(message: string): void {
    this.snackBar.error(message);
  };

  downloadPDF(documentID: string, url: string): void {
    this.zahtevService.download(`${url}/generate-pdf`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'pdf', 'application/pdf');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  };

  downloadHTML(documentID: string, url: string): void {
    this.zahtevService.download(`${url}/generate-html`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'html', 'text/html');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  };

  startDownload(fileName: string, response, extension: string, fileFormat: string) {
    let file = new Blob([response], { type: fileFormat });
    var fileURL = URL.createObjectURL(file);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = fileURL;
    a.download = `${fileName}.${extension}`;
    a.click();
    window.URL.revokeObjectURL(fileURL);
    a.remove();
  };
}
