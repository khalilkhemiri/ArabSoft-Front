import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SituationService {

  private baseUrl = 'http://localhost:8083/situation/demande'; 
  
  constructor(private http: HttpClient) { }
  AddConge(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data)
      .pipe(
        catchError(error => {
          console.error('An error occurred:', error);
          return throwError(() => new Error('Something went wrong; please try again later.'));
        })
      );
  }
}
