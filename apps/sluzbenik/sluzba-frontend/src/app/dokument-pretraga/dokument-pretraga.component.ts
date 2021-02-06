import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { IzvestajService } from '../core/services/izvestaj.service';
import { ObavestenjeService } from '../core/services/obavestenje.service';
import { ResenjaService } from '../core/services/resenja.service';
import { ZahtevService } from '../core/services/zahtev.service';
import { MyErrorStateMatcher } from '../shared/ErrorStateMatcher';

declare const Xonomy: any;

@Component({
  selector: 'app-dokument-pretraga',
  templateUrl: './dokument-pretraga.component.html',
  styleUrls: ['./dokument-pretraga.component.scss']
})
export class DokumentPretragaComponent implements OnInit {

  searchForm: FormGroup;

  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  selected: string = 'zahtev';

  selectedOperator: string = 'and';

  documents = [];

  constructor(
    private formBuilder: FormBuilder,
    private zahtevService: ZahtevService,
    private resenjaService: ResenjaService,
    private izvestajService: IzvestajService,
    private obavestenjeService: ObavestenjeService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      keyWord: '',
      metadata: '',
      type: '',
      operator: '',
    });
    this.getAllZahtevi();
  }

  getAllZahtevi(): void {
    this.zahtevService.getAll('zahtevi/all').subscribe(res => {
      let zahtevi = Xonomy.xml2js(res);
      zahtevi = zahtevi.getDescendantElements('zahtev');
      for (let i = 0; i < zahtevi.length; i++) {
        this.documents.push(
          {
            url: zahtevi[i].getText(),
            open: false,
            type: 'zahtev',
            referencedBy: []
          });
      }
    });
  };

  get f(): { [key: string]: AbstractControl; } { return this.searchForm.controls; }

  searchZahtev(form: string): void {
    this.documents = [];
    this.zahtevService.put('zahtevi/search', form).subscribe(res => {
      let zahtevi = Xonomy.xml2js(res);
      zahtevi = zahtevi.getDescendantElements('zahtev');
      for (let i = 0; i < zahtevi.length; i++) {
        this.documents.push(
          {
            url: zahtevi[i].getText(),
            open: false,
            type: 'zahtev',
            referencedBy: []
          });
      }
    });
  };

  searchResenje(form: string): void {
    this.documents = [];
    this.resenjaService.put('resenje/search', form).subscribe(res => {
      let resenja = Xonomy.xml2js(res);
      resenja = resenja.getDescendantElements('item');
      for (let i = 0; i < resenja.length; i++) {
        this.documents.push(
          {
            url: resenja[i].getText(),
            open: false,
            type: 'resenja',
            referencedBy: []
          });
      }
    });
  };

  searchIzvestaj(form: string): void {
    this.documents = [];
    this.zahtevService.put('izvestaji/search', form).subscribe(res => {
      let zahtevi = Xonomy.xml2js(res);
      zahtevi = zahtevi.getDescendantElements('zahtev');
      for (let i = 0; i < zahtevi.length; i++) {
        this.documents.push(
          {
            url: zahtevi[i].getText(),
            open: false,
            type: 'zahtev',
            referencedBy: []
          });
      }
    });
  };

  onSubmit(): void {
    if (this.searchForm.get('keyWord').value == '' && this.searchForm.get('metadata').value == '') {
      return;
    }
    let form = `<?xml version="1.0" encoding="UTF-8"?><form xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><key_word>${this.searchForm.get('keyWord').value}</key_word><metadata>${this.searchForm.get('metadata').value}</metadata><operator>${this.searchForm.get('operator').value}</operator></form>`;
    switch (this.searchForm.get('type').value) {
      case 'zahtev':
        this.searchZahtev(form);
        break;
      case 'godisnjiIzvestaj':
        this.searchIzvestaj(form);
        break;
      case 'resenje':
        this.searchResenje(form);
        break;
      default:
        break;
    }
  }

  reset(): void {
    this.documents = [];
    this.searchForm.reset();
    this.searchForm = this.formBuilder.group({
      keyWord: '',
      metadata: '',
      type: '',
      operator: '',
    });
    this.searchForm.patchValue({
      type: 'zahtev',
      operator: 'and',
    })
    this.getAllZahtevi();
  };
  getReferencesZahtev(index: number): void {
    this.obavestenjeService.get("obavestenja/find-id-with-references-on", this.documents[index].url.split("/")[4])
      .subscribe(res => {
        this.documents[index].referencedBy = [];
        let zahtevi = Xonomy.xml2js(res);
        zahtevi = zahtevi.getDescendantElements('zahtev');
        for (let i = 0; i < zahtevi.length; i++) {
          this.documents[index].referencedBy.push(zahtevi[i].getText());
        }
      });
    this.zahtevService.get("zahtevi/find-id-with-references-on-zalba-cutanje", this.documents[index].url.split("/")[4])
      .subscribe(res => {
        this.documents[index].referencedBy = [];
        let zahtevi = Xonomy.xml2js(res);
        zahtevi = zahtevi.getDescendantElements('item');
        for (let i = 0; i < zahtevi.length; i++) {
          this.documents[index].referencedBy.push(zahtevi[i].getText());
        }
      });
    this.zahtevService.get("zahtevi/find-id-with-references-on-zalba-na-odluku", this.documents[index].url.split("/")[4])
      .subscribe(res => {
        this.documents[index].referencedBy = [];
        let zahtevi = Xonomy.xml2js(res);
        zahtevi = zahtevi.getDescendantElements('item');
        for (let i = 0; i < zahtevi.length; i++) {
          this.documents[index].referencedBy.push(zahtevi[i].getText());
        }
      });
  };

  open(index: number) {
    if (this.documents[index].type == 'zahtev') {
      this.getReferencesZahtev(index);
    }
    this.documents[index].open = true;
  };

  close(index: number) {
    this.documents[index].open = false;
  };
}
