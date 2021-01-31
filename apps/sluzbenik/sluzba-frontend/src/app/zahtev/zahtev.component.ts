import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ZahtevService } from '../core/services/zahtev.service';
import { ZahtevXonomyService } from '../core/xonomy/zahtev-xonomy.service';
import { Snackbar } from '../shared/snackbars/snackbar/snackbar';

declare const Xonomy: any;

@Component({
  selector: 'app-zahtev',
  templateUrl: './zahtev.component.html',
  styleUrls: ['./zahtev.component.scss']
})
export class ZahtevComponent implements OnInit {

  constructor(private xonomyService: ZahtevXonomyService,
    private zahtevService: ZahtevService,
    private router: Router,
    private snackBar: Snackbar) { }

  ngOnInit(): void {
  }

  @ViewChild('zahtevXonomy', { static: false }) zahtevXonomy;
  @ViewChild('zahtevHTML', { static: false }) zahtevHTML;

  ngAfterViewInit(): void {
    let element = document.getElementById("zahtev");
    let xmlString = `<?xml version='1.0' encoding='UTF-8'?><za:zahtev_gradjana xmlns:common="http://www.projekat.org/common" xmlns:za="http://www.projekat.org/zahtev" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:pred="http://www.projekat.org/predicate/"><za:organ><common:adresa><common:mesto></common:mesto><common:ulica/><common:broj/></common:adresa><common:naziv></common:naziv></za:organ><za:trazilac><za:lice/><za:drugi_podatak_za_kontakt></za:drugi_podatak_za_kontakt></za:trazilac><za:informacije_vezane_za_zahtev><za:tip_zahteva></za:tip_zahteva><za:opis_zahteva></za:opis_zahteva><za:mesto></za:mesto><za:datum>${new Date().toISOString().slice(0, 10)}</za:datum></za:informacije_vezane_za_zahtev></za:zahtev_gradjana>`;
    Xonomy.render(xmlString, element, {
      validate: this.xonomyService.zahtevGradjanaSpecification.validate,
      elements: this.xonomyService.zahtevGradjanaSpecification.elements,
      onchange: () => { this.onChange() }
    });
    this.onChange();
  };

  public submit(): void {
    console.log(Xonomy.harvest());
    this.zahtevService.post("zahtevi", Xonomy.harvest())
      .subscribe(res => {
        this.succesMessage('Uspešno ste poslali zahtev.');
        this.router.navigateByUrl(`/`);
      },
        err => {
          this.errorMessage('Molimo Vas da ispravno popunite zahtev.');
        });
  };

  private succesMessage(message: string): void {
    this.snackBar.success(message);
  };

  private errorMessage(message: string): void {
    this.snackBar.error(message);
  };

  onChange() {
    this.zahtevHTML.nativeElement.innerHTML = this.xonomyService.convertZahtevXSLT(Xonomy.harvest());
  };
}
