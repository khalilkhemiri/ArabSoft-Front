import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chef-demande',
  templateUrl: './chef-demande.component.html',
  styleUrls: ['./chef-demande.component.css']
})
export class ChefDemandeComponent implements OnInit {
  demandes: any[] = [];
  selectedDemande: any;
  displayDialog: boolean = false;  
  demandesEnAttenteCount: number = 0;  
  demandesDuJour: number = 0;  
  user: any;
  activeMenuId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.getAllDemandes();
    this.getDemandesDuJour();
  }

  getAllDemandes() {
    this.http.get<any[]>(`http://localhost:8083/api/demandes/chef/${this.user.id}`).subscribe(
      data => {
        this.demandes = data;
        console.log(this.demandes)
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
        console.log(this.demandesDuJour)
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
    console.log('Demande approuvée:', this.selectedDemande);
    this.closeDialog();
  }

  rejectDemande() {
    console.log('Demande rejetée:', this.selectedDemande);
    this.closeDialog();
  }
  calculateDemandesEnAttente() {
    this.demandesEnAttenteCount = this.demandes.filter(demande => demande.statut === 'EN_ATTENTE').length;
  }
  toggleMenu(id: number) {
    this.activeMenuId = this.activeMenuId === id ? null : id;
  }
  generatePdf(demandeId: number) {
    this.http.get(`http://localhost:8083/api/demandes/reports/${demandeId}`, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `demande_${demandeId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error => {
        console.error('Error generating PDF:', error);
      }
    );
  }
}
