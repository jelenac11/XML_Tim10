import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Korisnik } from '../models/korisnik.model';

@Injectable()
export class KorisnikService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/xml' });

  constructor(
    private http: HttpClient
  ) { }

  registracija(body: Korisnik): Observable<any> {
    return this.http.post(`${environment.auth_url}registracija`, body, { headers: this.headers, responseType: 'text' });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${environment.auth_url}trenutno-ulogovan`, { responseType: 'text' });
  }

}
