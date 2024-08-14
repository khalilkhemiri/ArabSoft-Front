import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { SituationService } from 'src/app/services/ChangementSituation/situation.service';

@Component({
  selector: 'app-changementsituation',
  templateUrl: './changementsituation.component.html',
  styleUrls: ['./changementsituation.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class ChangementsituationComponent implements OnInit {

  congeForm: FormGroup;
  user: any;
  userid: number;

  constructor(
    private fb: FormBuilder,
    private situation: SituationService,
    private router: Router,
    private authservice: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.congeForm = this.fb.group({
      nouvelleSituation: ['', Validators.required],
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

      if (!this.user.id) {
        console.error('User ID is null or undefined');
        return;
      }

      const data = {
        nouvelleSituation: formValue.nouvelleSituation,
        utilisateurId: this.user.id
      };

      console.log('Data being sent:', data);

      this.situation.AddConge(data).subscribe({
        next: response => {
          this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Demande de congé soumise avec succès!'});
          console.log('Demande de congé soumise avec succès', response);
          this.router.navigate(['/situation']);
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
