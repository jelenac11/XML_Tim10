import { Component, OnInit } from '@angular/core';
import { JwtService } from '../core/services/jwt.service';
import { ZalbaNaOdlukuService } from '../core/services/zalba-na-odluku.service';
import { ZalbaCutanjeService } from '../core/services/zalba-cutanje.service';
import { ResenjaService } from '../core/services/resenja.service';

declare const Xonomy: any;

@Component({
  selector: 'app-moji-dokumenti',
  templateUrl: './moji-dokumenti.component.html',
  styleUrls: ['./moji-dokumenti.component.scss']
})
export class MojiDokumentiComponent implements OnInit {

  role: String;
  zalbeCutanje: String[] = [];
  zalbeNaOdluku: String[] = [];
  resenja: String[] = [];
  izvestaji: String[] = [];

  constructor(private zalbaNaOdlukuService: ZalbaNaOdlukuService,
    private zalbaCutanjeService: ZalbaCutanjeService,
    private resenjaService: ResenjaService,
    private jwtService: JwtService) { }

  ngOnInit(): void {
    this.role = this.jwtService.getRole();
    if (this.role == 'gradjanin') {
      this.getAllGradjanin();
    }
    else {
      this.getAllPoverenik();
    }
  };

  getAllGradjanin(): void {
    this.zalbaCutanjeService.getAll('zalba-cutanje').subscribe(res => {
      this.extractIds(res, this.zalbeCutanje);
    });
    this.zalbaNaOdlukuService.getAll('zalba-na-odluku').subscribe(res => {
      this.extractIds(res, this.zalbeNaOdluku);
    });
    this.resenjaService.getAll('resenje').subscribe(res => {
      this.extractIds(res, this.resenja);
    });
  };

  getAllPoverenik(): void {
    this.zalbaCutanjeService.getAll('zalba-cutanje/poverenik').subscribe(res => {
      this.extractIds(res, this.zalbeCutanje);
    });
    this.zalbaNaOdlukuService.getAll('zalba-na-odluku/poverenik').subscribe(res => {
      this.extractIds(res, this.zalbeNaOdluku);
    });
    this.resenjaService.getAll('resenje/poverenik').subscribe(res => {
      this.extractIds(res, this.resenja);
    });
  };

  extractIds(documentsId: string, collection: any[]): void {
    let dokumenti = Xonomy.xml2js(documentsId);
    dokumenti = dokumenti.getDescendantElements('item');
    for (let i = 0; i < dokumenti.length; i++) {
      collection.push(dokumenti[i].getText());
    }
  };

  downloadPDF(documentID: string, url: string): void {
    if (url === 'zalbeCutanje') {
      this.zalbaCutanjeService.download(`zalba-cutanje/generate-pdf`, documentID).subscribe(response => {
        this.startDownload(documentID, response, 'pdf', 'application/pdf');
      }), error => console.log('Error downloading the file'),
        () => console.info('File downloaded successfully');
    } else if (url === 'zalbeNaOdluku') {
      this.zalbaNaOdlukuService.download(`zalba-na-odluku/generate-pdf`, documentID).subscribe(response => {
        this.startDownload(documentID, response, 'pdf', 'application/pdf');
      }), error => console.log('Error downloading the file'),
        () => console.info('File downloaded successfully');
    } else if (url === 'resenja') {
      this.resenjaService.download(`resenje/generate-pdf`, documentID).subscribe(response => {
        this.startDownload(documentID, response, 'pdf', 'application/pdf');
      }), error => console.log('Error downloading the file'),
        () => console.info('File downloaded successfully');
    }
  };

  downloadHTML(documentID: string, url: string): void {
    if (url === 'zalbeCutanje') {
      this.zalbaCutanjeService.download(`zalba-cutanje/generate-html`, documentID).subscribe(response => {
        this.startDownload(documentID, response, 'html', 'text/html');
      }), error => console.log('Error downloading the file'),
        () => console.info('File downloaded successfully'); 
    } else if (url === 'zalbeNaOdluku') {
      this.zalbaNaOdlukuService.download(`zalba-na-odluku/generate-html`, documentID).subscribe(response => {
        this.startDownload(documentID, response, 'html', 'text/html');
      }), error => console.log('Error downloading the file'),
        () => console.info('File downloaded successfully'); 
    } else if (url === 'resenja') {
      this.resenjaService.download(`resenje/generate-html`, documentID).subscribe(response => {
        this.startDownload(documentID, response, 'html', 'text/html');
      }), error => console.log('Error downloading the file'),
        () => console.info('File downloaded successfully'); 
    }
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
