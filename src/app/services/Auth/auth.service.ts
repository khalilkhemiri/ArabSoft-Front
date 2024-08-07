import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {BehaviorSubject, Observable, tap } from 'rxjs';
import { UserProfile } from 'src/app/Model/test';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8083'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }


  private userIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  userId$: Observable<number | null> = this.userIdSubject.asObservable();

  setUserId(userId: number): void {
    this.userIdSubject.next(userId);
  }
  getUserId(): Observable<number | null> {
    return this.userId$;
  }
  public isLoggedIn(){
    return this.getUserId !== null ; 
  }
  public logout(){
    return this.getUserId == null ;  
  }


  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, credentials);
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }
  logouts(): Observable<any> {
    const userId = this.userIdSubject.value;
    if (userId === null) {
      return new Observable(observer => {
        observer.error('User is not logged in');
        observer.complete();
      });
    }
  
    // Assurez-vous d'inclure un objet options, même s'il est vide
    return this.http.post(`${this.baseUrl}/signout/${userId}`, null);
  }
  

  refreshToken(token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/refresh`, { token });
  }
  getUsersByRole(role: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/role/${role}`);
  }

  updateUserRole(userId: number, newRole: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/role/${userId}?newRole=${newRole}`, {});
  }
  assignPersonnelToChef(personnelId: number, chefId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/assignPersonnelToChef`, null, { params: { personnelId, chefId } });
  }
  getallusers(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${this.baseUrl}/all`);
  }

  getPersonnelsByChef(chefHierarchiqueId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/chef/${chefHierarchiqueId}`);
  }
  unassignPersonnel(personnelId: number): Observable<any> {
    return this.http.put<any>(`http://localhost:8083/unassign/${personnelId}`, {});
  }
  
}
