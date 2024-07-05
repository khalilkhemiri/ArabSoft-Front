import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      number: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:8083/signup', this.registerForm.value, { responseType: 'json' })
        .subscribe((response: any) => {
          console.log('Enregistrement réussi', response);
          if (response.statusCode === 200) {
            this.router.navigate(['/login']);
          } else {
            console.error('Erreur lors de l\'enregistrement', response);
          }
        }, error => {
          console.error('Erreur lors de l\'enregistrement', error);
        });
    }
  }
}
