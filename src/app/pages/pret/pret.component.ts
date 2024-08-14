import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoanRequest } from 'src/app/Model/test';
import { PretService } from 'src/app/services/Pret/pret.service';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-pret',
  templateUrl: './pret.component.html',
  styleUrls: ['./pret.component.css'],
  providers: [ConfirmationService]
})
export class PretComponent implements OnInit {
  user: any;
  loanRequest: LoanRequest;
  selectedType: string = 'PRET'; 

  constructor(
    private loanRequestService: PretService,
    private confirmationService: ConfirmationService
  ) {
    this.loanRequest = {
      montant: 0,
      utilisateurId: null,
      type: ''
    };
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.user && this.user.id) {
      this.loanRequest.utilisateurId = this.user.id;
    } else {
      console.error('Utilisateur non trouvé dans le localStorage');
    }
  }

  confirmSubmit(form: NgForm) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir soumettre cette demande de prêt ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onSubmit(form);
      },
      reject: () => {
        console.log('Soumission annulée');
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loanRequest.type = this.selectedType; 
      this.loanRequestService.submitLoanRequest(this.loanRequest).subscribe(response => {
        console.log('Demande de prêt soumise avec succès', response);
      }, error => {
        console.error('Erreur lors de la soumission de la demande de prêt', error);
      });
    }
  }
}
