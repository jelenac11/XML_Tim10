import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZalbaNaOdlukuService } from '../core/services/zalba-na-odluku.service';
import { ZalbaNaOdlukuXonomyService } from '../core/xonomy/zalba-na-odluku-xonomy.service';

declare const Xonomy: any;

@Component({
  selector: 'app-prikaz-zalba-na-odluku',
  templateUrl: './prikaz-zalba-na-odluku.component.html',
  styleUrls: ['./prikaz-zalba-na-odluku.component.scss']
})
export class PrikazZalbaNaOdlukuComponent implements OnInit {

  id: string;
  zalba: any;
  referencesOn: string[] = [];

  constructor(
    private xonomyService: ZalbaNaOdlukuXonomyService,
    private zalbaNaOdlukuService: ZalbaNaOdlukuService,
    private route: ActivatedRoute
  ) { }

  @ViewChild('zalbaHTML', { static: false }) zalbaHTML;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.zalbaNaOdlukuService.get('zalbe-na-odluku/XSLTDocument', this.id).subscribe(res => {
      let something = Xonomy.xml2js(res);
      something = something.children[0].getText();
      this.zalbaHTML.nativeElement.innerHTML = something;
    });
    this.getReferenced();
  }

  downloadPDF(): void {
    this.zalbaNaOdlukuService.download(`zalbe-na-odluku/generate-pdf`, this.id).subscribe(response => {
      this.startDownload(this.id, response, 'pdf', 'application/pdf');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  };

  downloadHTML(): void {
    this.zalbaNaOdlukuService.download(`zalbe-na-odluku/generate-html`, this.id).subscribe(response => {
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
    this.zalbaNaOdlukuService.download(`zalbe-na-odluku/extract-metadata/json`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'json', 'application/json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  extractMetadataAsXML(documentID: string) {
    this.zalbaNaOdlukuService.download(`zalbe-na-odluku/extract-metadata/xml`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'xml', 'application/xml');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  extractMetadataAsRDF(documentID: string) {
    this.zalbaNaOdlukuService.download(`zalbe-na-odluku/extract-metadata/rdf`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'rdf', 'application/rdf+xml');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  getReferenced(): void {
    this.zalbaNaOdlukuService.get("zalbe-na-odluku/references-on", this.id)
      .subscribe(res => {
        this.referencesOn = [];
        let zahtevi = Xonomy.xml2js(res);
        zahtevi = zahtevi.getDescendantElements('item');
        for (let i = 0; i < zahtevi.length; i++) {
          this.referencesOn.push(zahtevi[i].getText().split("^^")[0]);
        }
        console.log(this.referencesOn);
      });
  };

}
