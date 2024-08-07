import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoanRequest } from 'src/app/Model/test';

@Injectable({
  providedIn: 'root'
})
export class PretService {

  private apiUrl = 'http://localhost:8083/prets';

  constructor(private http: HttpClient) { }

  submitLoanRequesst(loanRequest: LoanRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, loanRequest);
  }
  submitLoanRequest(loanRequest: any): Observable<any> {
    return this.http.post(this.apiUrl, loanRequest);
  }


}
