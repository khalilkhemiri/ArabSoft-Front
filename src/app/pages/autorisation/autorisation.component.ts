import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-autorisation',
  templateUrl: './autorisation.component.html',
  styleUrls: ['./autorisation.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AutorisationComponent {
  autorisation: any = {
    motif: '',
    dateDebut: null,
    dateFin: null,
    type: 'AUTORISATION'
  };

  constructor(
    private http: HttpClient, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  submitAutorisation(form: any) {
    if (form.valid) {
      this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir soumettre cette demande?',
        accept: () => {
          this.http.post('http://localhost:8083/autorisation/demande', this.autorisation)
            .subscribe(
              response => {
                this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Demande envoyée avec succès!'});
                form.reset();
              },
              error => {
                this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Échec de l\'envoi de la demande!'});
              }
            );
        }
      });
    }
  }
}
