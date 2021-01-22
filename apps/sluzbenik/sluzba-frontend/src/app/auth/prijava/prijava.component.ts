import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikPrijava } from 'src/app/core/models/korisnik-prijava.model';
import { UserTokenState } from 'src/app/core/models/user-token-state.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { MyErrorStateMatcher } from 'src/app/shared/ErrorStateMatcher';
import { Snackbar } from 'src/app/shared/snackbars/snackbar/snackbar';

declare var require: any

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})
export class PrijavaComponent implements OnInit {

  formaLogin: FormGroup;
  submitted= false;
  hidePassword = true;
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: Snackbar,
    private router: Router,
    private jwtService: JwtService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.formaLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      lozinka: ['', Validators.required]
    });
  }

  get f() { return this.formaLogin.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.formaLogin.invalid) {
      return;
    }

    var korisnik: KorisnikPrijava = { "_declaration": { "_attributes": { "version": "1.0", "encoding": "utf-8" } }, "korisnik_prijava": { "_attributes": { "xmlns": "http://www.projekat.org/korisnik_portal_sluzbenik", "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance", "xsi:schemaLocation": "http://www.projekat.org/korisnik_portal_sluzbenik" }, "email": { "_text": '' }, "lozinka": { "_text": '' } } };
    korisnik.korisnik_prijava.email = this.formaLogin.value['email'];
    korisnik.korisnik_prijava.lozinka = this.formaLogin.value['lozinka'];

    var convert = require('xml-js');
    var korisnikPrijavaXML = convert.js2xml(korisnik, {compact: true, ignoreComment: true, spaces: 4});

    this.authenticationService.login(korisnikPrijavaXML).subscribe(data => {
      var korisnikToken = JSON.parse(convert.xml2json(data, {compact: true, spaces: 4}));
      var token: UserTokenState = { accessToken: korisnikToken.korisnik_token.accessToken._text, expiresIn: korisnikToken.korisnik_token.expiresIn._text };

      this.jwtService.saveToken(token);
      this.router.navigate(['/']);
    },
    error => {
      this.snackBar.error("Pogrešan e-mail ili lozinka.");
    });
  }

}
