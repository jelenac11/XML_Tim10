import { Component, OnInit } from '@angular/core';
import { ResenjaService } from '../core/services/resenja.service';
import { ZalbaCutanjeService } from '../core/services/zalba-cutanje.service';
import { ZalbaNaOdlukuService } from '../core/services/zalba-na-odluku.service';

declare const Xonomy: any;
@Component({
  selector: 'app-pregled-dokumenata',
  templateUrl: './pregled-dokumenata.component.html',
  styleUrls: ['./pregled-dokumenata.component.scss']
})
export class PregledDokumenataComponent implements OnInit {

  resenja = [];
  zalbeCutanje = [];
  zalbeNaOdluku = [];

  constructor(
    private zalbaNaOdlukuService: ZalbaNaOdlukuService,
    private zalbaCutanjeService: ZalbaCutanjeService,
    private resenjaService: ResenjaService) { }

  ngOnInit(): void {
    this.resenjaService.getAll('resenje/all').subscribe(res => {
      this.extractIds(res, this.resenja);
    });
    this.zalbaNaOdlukuService.getAll('zalba-na-odluku/poverenik').subscribe(res => {
      this.extractIds(res, this.zalbeNaOdluku);
    });
    this.zalbaCutanjeService.getAll('zalba-cutanje/poverenik').subscribe(res => {
      this.extractIds(res, this.zalbeCutanje);
    });
  }


  extractIds(documentsId: string, collection: any[]): void {
    let dokumenti = Xonomy.xml2js(documentsId);
    dokumenti = dokumenti.getDescendantElements('item');
    for (let i = 0; i < dokumenti.length; i++) {
      collection.push(dokumenti[i].getText());
    }
  }

  getId(path: string): string{
    const paths = path.split('/');
    return paths[paths.length - 1];
  }

  downloadPDF(documentID: string): void {
    this.resenjaService.download(`resenje/generate-pdf`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'pdf', 'application/pdf');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');

  }



  downloadHTML(documentID: string): void {
    this.resenjaService.download(`resenje/generate-html`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'html', 'text/html');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  startDownload(fileName: string, response, extension: string, fileFormat: string): void {
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
