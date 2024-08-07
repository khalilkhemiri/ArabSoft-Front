import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  demandes: any[] = [];
  selectedDemande: any;
  demandesEnAttenteCount: number = 0;
  demandesDuJour: number = 0;
  utilisateurId = 5;

  constructor(private http: HttpClient , private AuthService : AuthService) {}

  ngOnInit(): void {
    this.AuthService.getUserId().subscribe(
      (userId) => {
    this.http.get<any[]>(`http://localhost:8083/api/demandes/user/${userId}`).subscribe(
      data => {
        this.demandes = data;
      },
      error => {
        console.error('Erreur lors de la récupération des demandes par utilisateur', error);
      }
    );
  })
  }

  getDemandesByUtilisateurId() {
    this.AuthService.getUserId().subscribe(
      (userId) => {
    this.http.get<any[]>(`http://localhost:8083/api/demandes/user/${5}`).subscribe(
      data => {
        this.demandes = data;
      },
      error => {
        console.error('Erreur lors de la récupération des demandes par utilisateur', error);
      }
    );
  })
  }
  
}
