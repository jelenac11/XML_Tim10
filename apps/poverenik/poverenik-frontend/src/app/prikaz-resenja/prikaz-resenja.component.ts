import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResenjaService } from '../core/services/resenja.service';
import { ResenjaXonomyService } from '../core/xonomy/resenja-xonomy.service';

@Component({
  selector: 'app-prikaz-resenja',
  templateUrl: './prikaz-resenja.component.html',
  styleUrls: ['./prikaz-resenja.component.scss']
})
export class PrikazResenjaComponent implements OnInit {

  id: string;
  resenje: any;

  constructor(
    private xonomyService: ResenjaXonomyService,
    private resenjeService: ResenjaService,
    private route: ActivatedRoute
  ) { }

  @ViewChild('resenjeHTML', { static: false }) resenjeHTML;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.resenjeService.get(this.id).subscribe(res => {
      this.resenje = res;
      this.resenjeHTML.nativeElement.innerHTML = this.xonomyService.convertResenjeXSLT(this.resenje);
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


}
