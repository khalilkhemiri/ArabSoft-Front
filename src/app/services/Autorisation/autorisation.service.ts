import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autorisation } from 'src/app/Model/test';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {

  private apiUrl = 'http://localhost:8083/autorisation/demande';

  constructor(private http: HttpClient) { }

  submitLoanRequest(loanRequest: Autorisation): Observable<any> {
    return this.http.post<any>(this.apiUrl, loanRequest);
  }}
