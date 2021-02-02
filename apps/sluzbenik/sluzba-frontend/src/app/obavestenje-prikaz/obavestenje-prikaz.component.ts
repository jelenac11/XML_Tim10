import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObavestenjeService } from '../core/services/obavestenje.service';
import { ObavestenjeXonomyService } from '../core/xonomy/obavestenje-xonomy.service';

declare const Xonomy: any;

@Component({
  selector: 'app-obavestenje-prikaz',
  templateUrl: './obavestenje-prikaz.component.html',
  styleUrls: ['./obavestenje-prikaz.component.scss']
})
export class ObavestenjePrikazComponent implements OnInit {

  id: string;
  obavestenje: any;

  @ViewChild('obavestenjeHTML', { static: false }) obavestenjeHTML;

  constructor(
    private xonomyService: ObavestenjeXonomyService,
    private obavestenjeService: ObavestenjeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.obavestenjeService.get('obavestenja/XSLTDocument', this.id).subscribe(res => {
      let something = Xonomy.xml2js(res);
      something = something.children[0].getText();
      this.obavestenjeHTML.nativeElement.innerHTML = something;
    });
  }

  downloadPDF(documentID: string): void {
    this.obavestenjeService.download(`obavestenja/generate-pdf`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'pdf', 'application/pdf');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  };

  downloadHTML(documentID: string): void {
    this.obavestenjeService.download(`obavestenja/generate-html`, documentID).subscribe(response => {
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
    this.obavestenjeService.download(`obavestenja/extract-metadata/json`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'json', 'application/json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  extractMetadataAsXML(documentID: string) {
    this.obavestenjeService.download(`obavestenja/extract-metadata/xml`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'xml', 'application/xml');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  extractMetadataAsRDF(documentID: string) {
    this.obavestenjeService.download(`obavestenja/extract-metadata/rdf`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'ttl', 'application/x-turtle');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

}
