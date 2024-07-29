import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  demandes: any[] = [];
  selectedDemande: any;
  displayDialog: boolean = false;  
  demandesEnAttenteCount: number = 0;  
  demandesDuJour: number = 0;  

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllDemandes();
    this.getDemandesDuJour();
  }

  getAllDemandes() {
    this.http.get<any[]>('http://localhost:8083/api/demandes/all').subscribe(
      data => {
        this.demandes = data;
        this.calculateDemandesEnAttente();
      },
      error => {
        console.error('Erreur lors de la récupération des demandes', error);
      }
    );
  }

  getDemandesDuJour() {
    this.http.get<number>('http://localhost:8083/api/demandes/todayNbr').subscribe(
      data => {
        this.demandesDuJour = data;
      },
      error => {
        console.error('Erreur lors de la récupération des Nbr du demandes', error);
      }
    );
  }

  openDialog(demande: any) {
    this.selectedDemande = demande;
    this.displayDialog = true;
  }

  closeDialog() {
    this.displayDialog = false;
    this.selectedDemande = null;
  }

  approveDemande() {
    // Logique pour approuver la demande
    console.log('Demande approuvée:', this.selectedDemande);
    this.closeDialog();
  }

  rejectDemande() {
    // Logique pour rejeter la demande
    console.log('Demande rejetée:', this.selectedDemande);
    this.closeDialog();
  }
  calculateDemandesEnAttente() {
    this.demandesEnAttenteCount = this.demandes.filter(demande => demande.statut === 'EN_ATTENTE').length;
  }
}
