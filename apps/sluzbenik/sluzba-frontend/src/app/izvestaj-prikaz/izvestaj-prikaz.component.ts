import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IzvestajService } from '../core/services/izvestaj.service';

declare const Xonomy: any;

@Component({
  selector: 'app-izvestaj-prikaz',
  templateUrl: './izvestaj-prikaz.component.html',
  styleUrls: ['./izvestaj-prikaz.component.scss']
})
export class IzvestajPrikazComponent implements OnInit {

  id: string;
  izvestaj: any;

  constructor(
    private izvestajService: IzvestajService,
    private route: ActivatedRoute
  ) { }

  @ViewChild('izvestajHTML', { static: false }) izvestajHTML;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.izvestajService.get('izvestaji/XSLTDocument', this.id).subscribe(res => {
      let something = Xonomy.xml2js(res);
      something = something.children[0].getText();
      this.izvestajHTML.nativeElement.innerHTML = something;
    });
  }

  downloadPDF(): void {
    this.izvestajService.download(`izvestaji/generate-pdf`, this.id).subscribe(response => {
      this.startDownload(this.id, response, 'pdf', 'application/pdf');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  };

  downloadHTML(): void {
    this.izvestajService.download(`izvestaji/generate-html`, this.id).subscribe(response => {
      this.startDownload(this.id, response, 'html', 'text/html');
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
    this.izvestajService.download(`izvestaji/extract-metadata/json`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'json', 'application/json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  extractMetadataAsXML(documentID: string) {
    this.izvestajService.download(`izvestaji/extract-metadata/xml`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'xml', 'application/xml');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  extractMetadataAsRDF(documentID: string) {
    this.izvestajService.download(`izvestaji/extract-metadata/rdf`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'rdf', 'application/rdf+xml');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

}
