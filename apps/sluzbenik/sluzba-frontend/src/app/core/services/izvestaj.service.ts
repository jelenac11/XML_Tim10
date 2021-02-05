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

  podnesiIzvestaj(): Observable<any> {
    return this.http.get(`${environment.api_url}izvestaji`, { responseType: 'text' });
  }

  getXSLDocument(id: string): Observable<any> {
    console.log(`${environment.api_url}izvestaji/XSLTDocument/${id}`);
    return this.http.get(`${environment.api_url}izvestaji/XSLTDocument/${id}`, { responseType: 'text' });
  }

  download(path: string, id: string): any {
    return this.http.get(`${environment.api_url}${path}/${id}`, { responseType: 'arraybuffer' as 'text' });
  }
  
}
