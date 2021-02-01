import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZalbaCutanjeService {

  constructor(
    private http: HttpClient
  ) { }

  get(path: string, id: string): Observable<any> {
    return this.http.get(`${environment.api_url}${path}/${id}`, { responseType: 'text' });
  }
  
  post(path: string, body: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/xml' });
    return this.http.post(`${environment.api_url}${path}`, body, { headers: headers, responseType: 'text' });
  }

  getIstekliZahtevi(path: string): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { responseType: 'text' });
  }

  getXSLTZahtev(path: string, id: string): Observable<any> {
    return this.http.get(`${environment.api_url}${path}/${id}`, { responseType: 'text' });
  }

  getZahtev(path: string, id: string): Observable<any> {
    return this.http.get(`${environment.api_url}${path}/${id}`, { responseType: 'text' });
  }

}
