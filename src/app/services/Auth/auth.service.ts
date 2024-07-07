import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8083'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, credentials);
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
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
}
