import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-autorisation',
  templateUrl: './autorisation.component.html',
  styleUrls: ['./autorisation.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AutorisationComponent implements OnInit {
  autorisation: any = {
    motif: '',
    dateDebut: null,
    dateFin: null,
    type: 'AUTORISATION',
    utilisateurId: null
  };
  user: any;

  constructor(
    private http: HttpClient, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.user && this.user.id) {
      this.autorisation.utilisateurId = this.user.id;
    } else {
      console.error('Utilisateur non trouvé dans le localStorage');
    }
  }

  submitAutorisation(form: any) {
    if (form.valid) {
      this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir soumettre cette demande?',
        accept: () => {
          this.http.post('http://localhost:8083/autorisation/demande', this.autorisation, { responseType: 'text' })
            .subscribe(
              response => {
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: response });
                form.reset();
              },
              error => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de l\'envoi de la demande!' });
                console.error('Erreur lors de la soumission:', error);
              }
            );
        }
      });
    }
  }
  
}
