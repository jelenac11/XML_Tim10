import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KorisnikPrijava } from '../models/korisnik-prijava.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private headers = new HttpHeaders({'Content-Type': 'application/xml'});

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  login(user: KorisnikPrijava): Observable<any> {
    return this.http.post(`${environment.auth_url}prijava`, user, {headers: this.headers, responseType: 'text'});
  }

  logout(): void {
    this.jwtService.destroyToken();
  }

  isAuthenticated(): boolean {
    if (!this.jwtService.getToken()) {
      return false;
    }
    return true;
  }

  getRole(): string {
    return this.jwtService.getRole();
  }

}
