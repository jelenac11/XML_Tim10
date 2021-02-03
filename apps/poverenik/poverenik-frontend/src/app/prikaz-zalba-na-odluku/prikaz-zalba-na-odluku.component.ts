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

  constructor(
    private xonomyService: ZalbaNaOdlukuXonomyService,
    private zalbaNaOdlukuService: ZalbaNaOdlukuService,
    private route: ActivatedRoute
  ) { }

  @ViewChild('zalbaHTML', { static: false }) zalbaHTML;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.zalbaNaOdlukuService.get('zalba-na-odluku', this.id).subscribe(res => {
      this.zalba = res;
      this.zalbaHTML.nativeElement.innerHTML = this.xonomyService.convertZalbaXSLT(this.zalba);
    });
  }

  downloadPDF(): void {
    this.zalbaNaOdlukuService.download(`zalba-na-odluku/generate-pdf`, this.id).subscribe(response => {
      this.startDownload(this.id, response, 'pdf', 'application/pdf');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  };

  downloadHTML(): void {
    this.zalbaNaOdlukuService.download(`zalba-na-odluku/generate-html`, this.id).subscribe(response => {
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

}
