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
    this.zalbaNaOdlukuService.get('zahtevi/XSLTZalbaNaOdluku', this.id).subscribe(res => {
      this.zalba = res;
      this.zalbaHTML.nativeElement.innerHTML = this.xonomyService.convertZalbaXSLT(this.zalba);
    });
  }
}
