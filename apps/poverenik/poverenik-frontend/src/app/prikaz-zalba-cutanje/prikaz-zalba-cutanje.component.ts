import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZalbaCutanjeService } from '../core/services/zalba-cutanje.service';

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
    private zalbaCutanjeService: ZalbaCutanjeService,
    private route: ActivatedRoute
  ) { }

  @ViewChild('zalbaHTML', { static: false }) zalbaHTML;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.zalbaCutanjeService.get('zalba-cutanje/XSLTDocument', this.id).subscribe(res => {
      let zalba = Xonomy.xml2js(res);
      zalba = zalba.children[0].getText();
      this.zalbaHTML.nativeElement.innerHTML = zalba;
    });
  }

}
