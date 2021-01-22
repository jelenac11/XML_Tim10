import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Korisnik } from 'src/app/core/models/korisnik.model';
import { KorisnikService } from 'src/app/core/services/korisnik.service';
import { MyErrorStateMatcher } from 'src/app/shared/ErrorStateMatcher';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

declare var require: any

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})
export class RegistracijaComponent implements OnInit {

  formaRegistracija: FormGroup;
  submitted = false;
  hidePassword = true;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: Snackbar,
    private korisnikService: KorisnikService
  ) { }

  ngOnInit(): void {
    this.formaRegistracija = this.formBuilder.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lozinka: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.formaRegistracija.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.formaRegistracija.invalid) {
      return;
    }
    var korisnik: Korisnik = { "_declaration": { "_attributes": { "version": "1.0", "encoding": "utf-8" } }, "korisnik": { "_attributes": { "xmlns": "http://www.projekat.org/korisnik_portal_poverenik", "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation": "http://www.projekat.org/korisnik_portal_poverenik", "id": '' }, "ime": { "_text": '' }, "prezime": { "_text": '' }, "email": { "_text": '' }, "lozinka": { "_text": '' }, "uloga": { "_text": "gradjanin" } } };
    korisnik.korisnik["email"] = this.formaRegistracija.value['email'];
    korisnik.korisnik["lozinka"] = this.formaRegistracija.value['lozinka'];
    korisnik.korisnik["ime"] = this.formaRegistracija.value['ime'];
    korisnik.korisnik["prezime"] = this.formaRegistracija.value['prezime'];

    var convert = require('xml-js');
    var korisnikXML = convert.js2xml(korisnik, {compact: true, ignoreComment: true, spaces: 4});

    this.korisnikService.registracija(korisnikXML).subscribe(data => {
      this.snackBar.success("Uspešno ste se registrovali.");
      this.submitted = false;
      this.formaRegistracija.reset();
      for (let control in this.formaRegistracija.controls) {
        this.formaRegistracija.controls[control].setErrors(null);
      }
    },
    error => {
      if (error.status !== 200) {
        this.snackBar.error("Već postoji korisnik sa unetim e-mailom.");
      }
    });
  }

}
