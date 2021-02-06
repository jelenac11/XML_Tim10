import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResenjaService } from '../core/services/resenja.service';

declare const Xonomy: any;

@Component({
  selector: 'app-prikaz-resenja',
  templateUrl: './prikaz-resenja.component.html',
  styleUrls: ['./prikaz-resenja.component.scss']
})
export class PrikazResenjaComponent implements OnInit {
  id: string;
  resenje: any;
  referencesOn = [];

  constructor(
    private resenjeService: ResenjaService,
    private route: ActivatedRoute
  ) { }

  @ViewChild('resenjeHTML', { static: false }) resenjeHTML;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.resenjeService.get('XSLTDocument/'+this.id).subscribe(res => {
      let something = Xonomy.xml2js(res);
      something = something.children[0].getText();
      this.resenjeHTML.nativeElement.innerHTML = something;
      this.resenjeService.getTemplate(`resenje/references-on/${this.id}`,"").subscribe(res => {
        let zahtevi = Xonomy.xml2js(res);
        console.log(res);
        zahtevi = zahtevi.getDescendantElements('item');
        for (let i = 0; i < zahtevi.length; i++) {
          this.referencesOn.push(zahtevi[i].getText().split("^^")[0]);
        }
      });
    });
  }

  downloadPDF(): void {
    this.resenjeService.download(`resenje/generate-pdf`, this.id).subscribe(response => {
      this.startDownload(this.id, response, 'pdf', 'application/pdf');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  };

  downloadHTML(): void {
    this.resenjeService.download(`resenje/generate-html`, this.id).subscribe(response => {
      this.startDownload(this.id, response, 'html', 'text/html');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  };

  startDownload(fileName: string, response, extension: string, fileFormat: string): any {
    const file = new Blob([response], { type: fileFormat });
    const fileURL = URL.createObjectURL(file);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = fileURL;
    a.download = `${fileName}.${extension}`;
    a.click();
    window.URL.revokeObjectURL(fileURL);
    a.remove();
  };

  extractMetadataAsJSON(documentID: string): void {
    this.resenjeService.download(`resenje/extract-metadata/json`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'json', 'application/json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  extractMetadataAsXML(documentID: string): void {
    this.resenjeService.download(`resenje/extract-metadata/xml`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'xml', 'application/xml');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  extractMetadataAsRDF(documentID: string): void {
    this.resenjeService.download(`resenje/extract-metadata/rdf`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'rdf', 'application/rdf+xml');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  getReferenced(): void {
    this.resenjeService.getTemplate("resenja/references-on", this.id)
      .subscribe(res => {
        this.referencesOn = [];
        let dokumenti = Xonomy.xml2js(res);
        dokumenti = dokumenti.getDescendantElements('item');
        for (let i = 0; i < dokumenti.length; i++) {
          this.referencesOn.push(dokumenti[i].getText().split("^^")[0]);
        }
        console.log(this.referencesOn);
      });
  };

}
