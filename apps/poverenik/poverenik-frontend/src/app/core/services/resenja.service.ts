import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResenjaService {

  constructor(
    private http: HttpClient
  ) { }

  get(id: string): Observable<any> {
    return this.http.get(`${environment.api_url}resenje/${id}`, { responseType: 'text' });
  }

  post(body: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/xml' });
    return this.http.post(`${environment.api_url}resenje`, body, { headers, responseType: 'text' });
  }

  transform(xml: string): Observable<any> {
    return this.http.post(`${environment.api_url}resenje/transform`, xml , { responseType: 'text' });
  }
}
