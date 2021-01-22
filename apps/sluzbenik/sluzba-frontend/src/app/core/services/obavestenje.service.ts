import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObavestenjeService {

  get(path: string, id: string): Observable<any> {
    return this.http.get(`${environment.api_url}${path}/${id}`, { responseType: 'text' });
  }

  download(path: string, id: string): any {
    return this.http.get(`${environment.api_url}${path}/${id}`, { responseType: 'arraybuffer' as 'text' });
  }

  constructor(private http: HttpClient) { }

  post(path: string, body: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/xml' });
    return this.http.post(`${environment.api_url}${path}`, body, { headers: headers, responseType: 'text' });
  }
}
