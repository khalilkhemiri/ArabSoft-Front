import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class DocumentComponent implements OnInit {
  user: any;

  document = {
    motif: '',
    typeDocument: '',
    utilisateurId: null
  };

  documentTypes = ['Attestation de travail', 'Attestation de salaire', 'Bulletin de paie'];
  selectedTypes: { [key: string]: boolean } = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.user && this.user.id) {
      this.document.utilisateurId = this.user.id;
    } else {
      console.error('Utilisateur non trouvé dans le localStorage');
    }
  }

  confirmSubmit() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir soumettre cette demande de document administratif ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onSubmit();
      },
      reject: () => {
        console.log('Soumission annulée');
      }
    });
  }

  onSubmit() {
    this.document.typeDocument = this.getSelectedTypes();
    this.http.post('http://localhost:8083/document/demande', this.document).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Demande de document soumise avec succès' });
        console.log(response);
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la soumission de la demande' });
        console.error(error);
      }
    );
  }

  getSelectedTypes(): string {
    return Object.keys(this.selectedTypes).filter(type => this.selectedTypes[type]).join(',');
  }
}
