import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private baseUrl = 'http://localhost:8083'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  AddConge(data: any): Observable<any> {
    return this.http.post('http://localhost:8083/conges/demande', data);
  }
}
