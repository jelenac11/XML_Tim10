import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/core/models/korisnik.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { KorisnikService } from 'src/app/core/services/korisnik.service';

declare var require: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  role = '';
  korisnik: Korisnik;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private jwtService: JwtService,
    private korisnikService: KorisnikService
  ) { }

  ngOnInit(): void {
    this.role = this.jwtService.getRole();
    if (this.role) {
      this.korisnikService.getTrenutnoUlogovan().subscribe(data => {
        var convert = require('xml-js');
        this.korisnik = convert.xml2js(data, {ignoreComment: true, compact: true});
      }, error => { console.log(error) });
    }
  }

  logout(): void {
    this.authenticationService.logout();
    this.role = '';
    this.router.navigate(['/prijava']);
  }

}
