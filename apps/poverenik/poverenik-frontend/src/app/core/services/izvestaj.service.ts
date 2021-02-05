import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IzvestajService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/xml' });

  constructor(
    private http: HttpClient
  ) { }

  get(path: string, id: string): Observable<any> {
    return this.http.get(`${environment.api_url}${path}/${id}`, { responseType: 'text' });
  }

  getAll(path: string): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { responseType: 'text' });
  }

  podnesiIzvestaj(): Observable<any> {
    return this.http.get(`${environment.api_url}izvestaj`, { responseType: 'text' });
  }

  download(path: string, id: string): any {
    return this.http.get(`${environment.api_url}${path}/${id}`, { responseType: 'arraybuffer' as 'text' });
  }
  
}
