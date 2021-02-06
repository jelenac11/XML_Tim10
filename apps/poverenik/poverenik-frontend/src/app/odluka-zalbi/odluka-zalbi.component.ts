import { Component, OnInit } from '@angular/core';
import { ZalbaCutanjeService } from '../core/services/zalba-cutanje.service';
import { ZalbaNaOdlukuService } from '../core/services/zalba-na-odluku.service';

declare const Xonomy: any;

@Component({
  selector: 'app-odluka-zalbi',
  templateUrl: './odluka-zalbi.component.html',
  styleUrls: ['./odluka-zalbi.component.scss']
})
export class OdlukaZalbiComponent implements OnInit {

  zalbeCutanje = [];
  zalbeNaOdluku = [];

  constructor(
    private zalbaNaOdlukuService: ZalbaNaOdlukuService,
    private zalbaCutanjeService: ZalbaCutanjeService ) { }

  ngOnInit(): void {
    this.zalbaNaOdlukuService.getAll('zalbe-na-odluku/dozvoljene').subscribe(res => {
      this.extractIds(res, this.zalbeNaOdluku);
    });
    this.zalbaCutanjeService.getAll('zalbe-cutanje/dozvoljene').subscribe(res => {
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
  downloadPDF(documentID: string, url: string): void {
    if (url === 'zalbeCutanje') {
      this.zalbaCutanjeService.download(`zalbe-cutanje/generate-pdf`, documentID).subscribe(response => {
        this.startDownload(documentID, response, 'pdf', 'application/pdf');
      }), error => console.log('Error downloading the file'),
        () => console.info('File downloaded successfully');
    } else if (url === 'zalbeNaOdluku') {
      this.zalbaNaOdlukuService.download(`zalbe-na-odluku/generate-pdf`, documentID).subscribe(response => {
        this.startDownload(documentID, response, 'pdf', 'application/pdf');
      }), error => console.log('Error downloading the file'),
        () => console.info('File downloaded successfully');
    }
  };

  downloadHTML(documentID: string, url: string): void {
    if (url === 'zalbeCutanje') {
      this.zalbaCutanjeService.download(`zalbe-cutanje/generate-html`, documentID).subscribe(response => {
        this.startDownload(documentID, response, 'html', 'text/html');
      }), error => console.log('Error downloading the file'),
        () => console.info('File downloaded successfully'); 
    } else if (url === 'zalbeNaOdluku') {
      this.zalbaNaOdlukuService.download(`zalbe-na-odluku/generate-html`, documentID).subscribe(response => {
        this.startDownload(documentID, response, 'html', 'text/html');
      }), error => console.log('Error downloading the file'),
        () => console.info('File downloaded successfully'); 
    }
  };

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
