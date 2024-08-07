import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { CongeService } from 'src/app/services/Conge/conge.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CongeComponent implements OnInit {
  congeForm: FormGroup;
  user: any;
  userid: number;

  constructor(
    private fb: FormBuilder,
    private congeService: CongeService,
    private router: Router,
    private authservice: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.congeForm = this.fb.group({
      motif: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.authservice.getUserId().subscribe(
      userId => {
        this.userid = userId;
        console.log('User ID:', this.userid);
      }
    );
  }

  confirmSubmit() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir soumettre cette demande de congé?',
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

  onSubmit(): void {
    if (this.congeForm.valid) {
      const formValue = this.congeForm.value;
      const formattedStartDate = this.formatDate(formValue.start);
      const formattedEndDate = this.formatDate(formValue.end);

      if (!this.user.id) {
        console.error('User ID is null or undefined');
        return;
      }

      const data = {
        motif: formValue.motif,
        dateDebut: formattedStartDate,
        dateFin: formattedEndDate,
        utilisateurId: this.user.id
      };

      console.log('Data being sent:', data);

      this.congeService.AddConge(data).subscribe({
        next: response => {
          this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Demande de congé soumise avec succès!'});
          console.log('Demande de congé soumise avec succès', response);
          this.router.navigate(['/conge']);
          this.congeForm.reset();
        },
        error: error => {
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Échec de la soumission de la demande de congé!'});
          console.error('Erreur lors de la soumission de la demande de congé', error);
        }
      });
    }
  }

  formatDate(date: Date | string): string {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return date;
  }
}
