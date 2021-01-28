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

  downloadPDF(): void {
    this.zahtevService.download('zahtevi/generate-pdf', this.id).subscribe(response => {
      this.startDownload(response, 'pdf', 'application/pdf');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  downloadHTML(): void {
    this.zahtevService.download('zahtevi/generate-html', this.id).subscribe(response => {
      this.startDownload(response, 'html', 'text/html');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  startDownload(response, extension: string, fileFormat: string) {
    let file = new Blob([response], { type: fileFormat });
    var fileURL = URL.createObjectURL(file);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = fileURL;
    a.download = `${this.id}.${extension}`;
    a.click();
    window.URL.revokeObjectURL(fileURL);
    a.remove();
  }
}
