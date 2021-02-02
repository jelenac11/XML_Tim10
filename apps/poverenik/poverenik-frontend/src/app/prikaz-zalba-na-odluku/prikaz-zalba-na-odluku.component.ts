import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZalbaNaOdlukuService } from '../core/services/zalba-na-odluku.service';

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
    private zalbaNaOdlukuService: ZalbaNaOdlukuService,
    private route: ActivatedRoute
  ) { }

  @ViewChild('zalbaHTML', { static: false }) zalbaHTML;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.zalbaNaOdlukuService.get('zalba-na-odluku/XSLTDocument', this.id).subscribe(res => {
      let something = Xonomy.xml2js(res);
      something = something.children[0].getText();
      this.zalbaHTML.nativeElement.innerHTML = something;
    });
  }

}
