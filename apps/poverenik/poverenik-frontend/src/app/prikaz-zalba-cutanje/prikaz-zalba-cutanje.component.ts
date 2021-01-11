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
    this.zalbaCutanjeService.get('zalba-cutanje', this.id).subscribe(res => {
      this.zalba = res;
      this.zalbaHTML.nativeElement.innerHTML = this.xonomyService.convertZalbaXSLT(this.zalba);
    });
  }

  ngAfterViewInit(): void {
    this.zalbaHTML.nativeElement.innerHTML = this.xonomyService.convertZalbaXSLT(this.zalba);
  }

}
