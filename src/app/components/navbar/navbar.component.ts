import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES,ROUTESADMIN,PERS } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public user: any;
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router, private authService: AuthService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.listTitles = ROUTESADMIN.filter(listTitle => listTitle);
    this.listTitles = PERS.filter(listTitle => listTitle);

    this.user = JSON.parse(localStorage.getItem('user') || '{}');

  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  onLogout(): void {
    console.log('Logout method called');
    this.authService.logouts().subscribe(
      response => {
        console.log('Successfully signed out', response);
        
        // Vérifiez le stockage local avant et après la suppression
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Rediriger vers la page de connexion
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error during sign out', error);
      }
    );
  }
  
  
  
}
