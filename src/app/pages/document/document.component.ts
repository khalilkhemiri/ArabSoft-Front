import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent {
  document = {
    motif: '',
    typeDocument: '',  // Correction here
  };

  documentTypes = ['Attestation de travail', 'Attestation de salaire', 'Bulletin de paie'];
  selectedTypes: { [key: string]: boolean } = {};

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.document.typeDocument = this.getSelectedTypes();  // Correction here
    this.http.post('http://localhost:8083/document/demande', this.document).subscribe(response => {
      console.log(response);
    });
  }

  getSelectedTypes(): string {
    return Object.keys(this.selectedTypes).filter(type => this.selectedTypes[type]).join(',');
  }
}
