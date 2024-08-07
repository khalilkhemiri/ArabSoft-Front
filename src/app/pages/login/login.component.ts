import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            // Store token and user info
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.users));  
            const userId = response.users.id;
            const userRole = response.users.role;
            this.authService.setUserId(userId);

            console.log(response.users)
            console.log(this.authService.getUserId())

            if (userRole === 'ADMIN') {
              this.router.navigate(['/dashboard']);   
            } else if (userRole === 'CHEF') {
              this.router.navigate(['/dashchef']);
            } else if (userRole === 'PERSONNEL') {
              this.router.navigate(['/historique']);
            } else {
              this.router.navigate(['/default']); 
            }          } else {
            this.errorMessage = response.message || 'Login failed';
          }
        },
        (error) => {
          this.errorMessage = 'Login failed: ' + (error.error.message || 'Unknown error');
          console.error('Login failed', error);
        }
      );
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
