import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZahtevService } from '../core/services/zahtev.service';
import { ZahtevXonomyService } from '../core/xonomy/zahtev-xonomy.service';

declare const Xonomy: any;

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
    private xonomyService: ZahtevXonomyService,
    private zahtevService: ZahtevService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.zahtevService.get('zahtevi/XSLTDocument', this.id).subscribe(res => {
      let something = Xonomy.xml2js(res);
      something = something.children[0].getText();
      this.zahtevHTML.nativeElement.innerHTML = something;
    });
  }

  downloadPDF(documentID: string): void {
    this.zahtevService.download(`zahtevi/generate-pdf`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'pdf', 'application/pdf');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  };

  downloadHTML(documentID: string): void {
    this.zahtevService.download(`zahtevi/generate-html`, documentID).subscribe(response => {
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

  extractMetadataAsJSON(documentID: string) {
    this.zahtevService.download(`zahtevi/extract-metadata/json`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'json', 'application/json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  extractMetadataAsXML(documentID: string) {
    this.zahtevService.download(`zahtevi/extract-metadata/xml`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'xml', 'application/xml');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  extractMetadataAsRDF(documentID: string) {
    this.zahtevService.download(`zahtevi/extract-metadata/rdf`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'ttl', 'application/x-turtle');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }
}
