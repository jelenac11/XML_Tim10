import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { IzvestajService } from '../core/services/izvestaj.service';
import { ResenjaService } from '../core/services/resenja.service';
import { ZalbaCutanjeService } from '../core/services/zalba-cutanje.service';
import { ZalbaNaOdlukuService } from '../core/services/zalba-na-odluku.service';
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

  selected: string = 'zalbeCutanje';

  selectedOperator: string = 'and';

  documents = [];

  constructor(
    private formBuilder: FormBuilder,
    private zalbaCutanjeService: ZalbaCutanjeService,
    private izvestajService: IzvestajService,
    private zalbaNaOdlukuService: ZalbaNaOdlukuService,
    private resenjaService: ResenjaService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      keyWord: '',
      metadata: '',
      type: '',
      operator: '',
    });
    this.getAllZalbeCutanje();
  }

  getAllZalbeCutanje(): void {
    this.zalbaCutanjeService.getAll('zalbe-cutanje/all').subscribe(res => {
      let zalbeCutanje = Xonomy.xml2js(res);
      zalbeCutanje = zalbeCutanje.getDescendantElements('item');
      for (let i = 0; i < zalbeCutanje.length; i++) {
        this.documents.push(
          {
            url: zalbeCutanje[i].getText(),
            open: false,
            type: 'zalbeCutanje',
            referencedBy: []
          });
      }
    });
  };

  get f(): { [key: string]: AbstractControl; } { return this.searchForm.controls; }

  searchZalbeCutanje(form: string): void {
    this.documents = [];
    this.zalbaCutanjeService.put('zalbe-cutanje/search', form).subscribe(res => {
      let zalbeCutanje = Xonomy.xml2js(res);
      zalbeCutanje = zalbeCutanje.getDescendantElements('item');
      for (let i = 0; i < zalbeCutanje.length; i++) {
        this.documents.push(
          {
            url: zalbeCutanje[i].getText(),
            open: false,
            type: 'zalbeCutanje',
            referencedBy: []
          });
      }
    });
  };

  searchZalbeNaOdluku(form: string): void {
    this.documents = [];
    this.zalbaNaOdlukuService.put('zalbe-na-odluku/search', form).subscribe(res => {
      let zalbeNaOdluku = Xonomy.xml2js(res);
      zalbeNaOdluku = zalbeNaOdluku.getDescendantElements('item');
      for (let i = 0; i < zalbeNaOdluku.length; i++) {
        this.documents.push(
          {
            url: zalbeNaOdluku[i].getText(),
            open: false,
            type: 'zalbeNaOdluku',
            referencedBy: []
          });
      }
    });
  };

  searchResenje(form: string): void {
    console.log('res');
  };

  searchIzvestaj(form: string): void {
    this.documents = [];
    this.izvestajService.put('izvestaji/search', form).subscribe(res => {
      let izvestaji = Xonomy.xml2js(res);
      izvestaji = izvestaji.getDescendantElements('item');
      for (let i = 0; i < izvestaji.length; i++) {
        this.documents.push(
          {
            url: izvestaji[i].getText(),
            open: false,
            type: 'izvestaji',
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
      case 'zalbeCutanje':
        this.searchZalbeCutanje(form);
        break;
      case 'zalbeNaOdluku':
          this.searchZalbeNaOdluku(form);
          break; 
      case 'resenje':
        this.searchResenje(form);
        break;
      case 'godisnjiIzvestaj':
        this.searchIzvestaj(form);
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
      type: 'zalbeCutanje',
      operator: 'and',
    })
    this.getAllZalbeCutanje();
  };

  getReferencesZalbeCutanja(index: number): void {
    this.resenjaService.getReferences("resenja/find-id-with-references-on-zalbe-cutanja", this.documents[index].url.split("/")[4])
      .subscribe(res => {
        this.documents[index].referencedBy = [];
        let zalbeCutanje = Xonomy.xml2js(res);
        zalbeCutanje = zalbeCutanje.getDescendantElements('item');
        for (let i = 0; i < zalbeCutanje.length; i++) {
          this.documents[index].referencedBy.push(zalbeCutanje[i].getText());
        }
      });
  };

  getReferencesZalbeNaOdluku(index: number): void {
    this.resenjaService.getReferences("resenja/find-id-with-references-on-zalbe-na-odluku", this.documents[index].url.split("/")[4])
      .subscribe(res => {
        this.documents[index].referencedBy = [];
        let zalbeNaOdluku = Xonomy.xml2js(res);
        zalbeNaOdluku = zalbeNaOdluku.getDescendantElements('item');
        for (let i = 0; i < zalbeNaOdluku.length; i++) {
          this.documents[index].referencedBy.push(zalbeNaOdluku[i].getText());
        }
      });
  };

  open(index: number) {
    if (this.documents[index].type == 'zalbeCutanje') {
      this.getReferencesZalbeCutanja(index);
    }
    if (this.documents[index].type == 'zalbeNaOdluku') {
      this.getReferencesZalbeNaOdluku(index);
    }
    this.documents[index].open = true;
  };

  close(index: number) {
    this.documents[index].open = false;
  };

}
