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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.zahtevService.get('zahtevi', this.id).subscribe(res => {
      this.zahtev = res;
      this.zahtevHTML.nativeElement.innerHTML = this.xonomyService.convertZahtevXSLT(this.zahtev);
    });
  }

  ngAfterViewInit(): void {
    this.zahtevHTML.nativeElement.innerHTML = this.xonomyService.convertZahtevXSLT(this.zahtev);
  }
}
