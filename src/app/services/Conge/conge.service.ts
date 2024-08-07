import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Customer } from 'src/app/Model/test';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private baseUrl = 'http://localhost:8083/conges/demande'; // Remplacez par l'URL de votre backend
  
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
    
    

    
 async getCustomersLarge() {
        const res = await this.http.get<any>('assets/data.json')
         .toPromise();
     const data = <Customer[]>res.data;
     return data;
    }
};
