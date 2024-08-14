import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService]

})
export class DashboardComponent implements OnInit {
  demandes: any[] = [];
  selectedDemande: any;
  displayDialog: boolean = false;  
  demandesEnAttenteCount: number = 0;  
  demandesDuJour: number = 0;  

  constructor(private http: HttpClient,private messageService: MessageService,  private demandeService: AuthService) {}

  ngOnInit() {
    this.getAllDemandes();
    this.getDemandesDuJour();
  }

  getAllDemandes() {
    this.http.get<any[]>('http://localhost:8083/api/demandes/all').subscribe(
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
    if (this.selectedDemande && this.selectedDemande.id && this.selectedDemande.type) {
      this.demandeService
        .approuverDemande(this.selectedDemande.id, this.selectedDemande.type)
        .subscribe(
          (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Demande approuvée avec succès',
            });
            this.selectedDemande.statut = 'APPROUVEE';
            this.displayDialog = false;
            
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de l\'approbation de la demande',
            });
          }
        );
    }
  }
  
  rejectDemande() {
    if (this.selectedDemande && this.selectedDemande.id && this.selectedDemande.type) {
      this.demandeService
        .rejeterDemande(this.selectedDemande.id, this.selectedDemande.type)
        .subscribe(
          (response) => {
            console.log('Réponse:', response);
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Demande rejetée avec succès',
            });
            this.selectedDemande.statut = 'REJETEE';
            this.displayDialog = false;
          },
          (error) => {
            console.error('Erreur:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors du rejet de la demande',
            });
          }
        );
    }}
  
  calculateDemandesEnAttente() {
    this.demandesEnAttenteCount = this.demandes.filter(demande => demande.statut === 'EN_ATTENTE').length;
  }
}
