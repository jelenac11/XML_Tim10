import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZalbaCutanjeService } from '../core/services/zalba-cutanje.service';
import { ZalbaCutanjeXonomyService } from '../core/xonomy/zalba-cutanje-xonomy.service';

declare const Xonomy: any;

@Component({
  selector: 'app-prikaz-zalba-cutanje',
  templateUrl: './prikaz-zalba-cutanje.component.html',
  styleUrls: ['./prikaz-zalba-cutanje.component.scss']
})
export class PrikazZalbaCutanjeComponent implements OnInit {

  id: string;
  zalba: any;

  constructor(
    private xonomyService: ZalbaCutanjeXonomyService,
    private zalbaCutanjeService: ZalbaCutanjeService,
    private route: ActivatedRoute
  ) { }

  @ViewChild('zalbaHTML', { static: false }) zalbaHTML;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.zalbaCutanjeService.get('zalbe-cutanje', this.id).subscribe(res => {
      this.zalba = res;
      this.zalbaHTML.nativeElement.innerHTML = this.xonomyService.convertZalbaXSLT(this.zalba);
    });
  }

  downloadPDF(): void {
    this.zalbaCutanjeService.download(`zalbe-cutanje/generate-pdf`, this.id).subscribe(response => {
      this.startDownload(this.id, response, 'pdf', 'application/pdf');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  };

  downloadHTML(): void {
    this.zalbaCutanjeService.download(`zalbe-cutanje/generate-html`, this.id).subscribe(response => {
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
    this.zalbaCutanjeService.download(`zalbe-cutanje/extract-metadata/json`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'json', 'application/json');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  extractMetadataAsXML(documentID: string) {
    this.zalbaCutanjeService.download(`zalbe-cutanje/extract-metadata/xml`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'xml', 'application/xml');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  extractMetadataAsRDF(documentID: string) {
    this.zalbaCutanjeService.download(`zalbe-cutanje/extract-metadata/rdf`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'rdf', 'application/rdf+xml');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }
}
