import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CongeService } from 'src/app/services/Conge/conge.service';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css'],
})
export class CongeComponent implements OnInit {
  congeForm: FormGroup;
  user: any;

  constructor(private fb: FormBuilder, private congeService: CongeService, private router: Router) {}

  ngOnInit(): void {
    this.congeForm = this.fb.group({
      motif: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.user.id)
  }

  onSubmit(): void {
    if (this.congeForm.valid) {
      const formValue = this.congeForm.value;
      const formattedStartDate = this.formatDate(formValue.start);
      const formattedEndDate = this.formatDate(formValue.end);
      const data = {
        motif: formValue.motif,
        dateDebut: formattedStartDate,
        dateFin:formattedEndDate,
        utilisateurId:this.user.id
      };

      this.congeService.AddConge(data).subscribe(
        response => {
          console.log('Demande de congé soumise avec succès', response);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Erreur lors de la soumission de la demande de congé', error);
        }
      );
    }
  }
  formatDate(date: Date | string): string {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return date;
  }
}
