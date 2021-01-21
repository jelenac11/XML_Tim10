import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObavestenjeService } from '../core/services/obavestenje.service';
import { ObavestenjeXonomyService } from '../core/xonomy/obavestenje-xonomy.service';

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
    this.obavestenjeService.get('obavestenja', this.id).subscribe(res => {
      this.obavestenje = res;
      this.obavestenjeHTML.nativeElement.innerHTML = this.xonomyService.convertObavestenjeXSLT(this.obavestenje);
    });
  }

  downloadPDF(): void {
    this.obavestenjeService.download('obavestenja/generate-pdf', this.id).subscribe(response => {
      let file = new Blob([response], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = fileURL;
      a.download = `${this.id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(fileURL);
      a.remove();
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  downloadHTML(): void {
    this.obavestenjeService.download('obavestenja/generate-html', this.id).subscribe(response => {
      let file = new Blob([response], { type: 'text/html' });
      var fileURL = URL.createObjectURL(file);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = fileURL;
      a.download = `${this.id}.html`;
      a.click();
      window.URL.revokeObjectURL(fileURL);
      a.remove();
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

}
