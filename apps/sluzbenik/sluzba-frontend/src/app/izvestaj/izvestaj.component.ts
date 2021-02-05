import { Component, OnInit, ViewChild } from '@angular/core';
import { IzvestajService } from '../core/services/izvestaj.service';

declare const Xonomy: any;

@Component({
  selector: 'app-izvestaj',
  templateUrl: './izvestaj.component.html',
  styleUrls: ['./izvestaj.component.scss']
})
export class IzvestajComponent implements OnInit {

  id = "0";
  izvestaj: any;
  podnetIzvestaj = false;

  @ViewChild('izvestajHTML', { static: false }) izvestajHTML;

  constructor(
    private izvestajService: IzvestajService,
  ) { }

  ngOnInit(): void {
    
  }

  podnesiIzvestaj(): void {
    this.izvestajService.podnesiIzvestaj().subscribe(res => {
      this.podnetIzvestaj = true;
      this.id = res.split('/')[4];
      this.izvestajService.getXSLDocument(res.split('/')[4]).subscribe(res2 => {
        let something = Xonomy.xml2js(res2);
        something = something.children[0].getText();
        this.izvestajHTML.nativeElement.innerHTML = something;
      });
    });
  };

  downloadPDF(documentID: string): void {
    this.izvestajService.download(`izvestaj/generate-pdf`, documentID).subscribe(response => {
      this.startDownload(documentID, response, 'pdf', 'application/pdf');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  };

  downloadHTML(documentID: string): void {
    this.izvestajService.download(`izvestaj/generate-html`, documentID).subscribe(response => {
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
