import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import {BehaviorSubject, Observable, tap } from 'rxjs';
import { UserProfile } from 'src/app/Model/test';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8083'; 

  constructor(private http: HttpClient) { }


  private userIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  userId$: Observable<number | null> = this.userIdSubject.asObservable();

  setUserId(userId: number): void {
    this.userIdSubject.next(userId);
  }
  getUserId(): Observable<number | null> {
    return this.userId$;
  }
  public isLoggedIn(): boolean {
    return this.userIdSubject.value !== null;
  }
  public logout(): void {
    this.setUserId(null);
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
  this.setUserId(null);
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
  
  getDemandesParMois(): Observable<any> {
    return this.http.get<any>(`http://localhost:8083/api/demandes/par-mois`);
  }
  getDemandesParMoisApprouvez(): Observable<any> {
    return this.http.get<any>(`http://localhost:8083/api/demandes/par-mois-approuvez`);
  }

  countPersonnelByChef(idchef: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/personnel/count/${idchef}`);
  }
  sendMeetingLinkToEmployees(chefId: number, meetingUrl: string): Observable<any> {
    const params = new HttpParams()
        .set('chefHierarchiqueId', chefId.toString())
        .set('meetingLink', meetingUrl);
        
    return this.http.post(`${this.baseUrl}/sendMeetingLink`, null, { params });
}




approuverDemande(demandeId: number, typeDemande: string): Observable<HttpResponse<any>> {
  const params = new HttpParams()
    .set('demandeId', demandeId.toString())
    .set('typeDemande', typeDemande);

  return this.http.put<HttpResponse<any>>('http://localhost:8083/api/demandes/approuver', {}, { observe: 'response', params });
}

rejeterDemande(demandeId: number, typeDemande: string): Observable<any> {
  return this.http.put(`http://localhost:8083/api/demandes/rejeter`, null, {
    params: {
      demandeId: demandeId.toString(),
      typeDemande: typeDemande
    }
  });
}
}
