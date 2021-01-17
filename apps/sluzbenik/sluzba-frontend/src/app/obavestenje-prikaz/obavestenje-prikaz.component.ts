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

}
