import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-chef-empl',
  templateUrl: './chef-empl.component.html',
  styleUrls: ['./chef-empl.component.css']
})
export class ChefEmplComponent implements OnInit {

  personnels: any[] = [];
  selectedCustomer1: any;
  user:any;

  constructor(private userProfileService: AuthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.userProfileService.getPersonnelsByChef(this.user.id).subscribe(data => {
      this.personnels = data;
    }, error => {
      console.error('Erreur lors de la récupération des personnels', error);
    });
  }
  unassign(personnelId: number) {
    this.userProfileService.unassignPersonnel(personnelId).subscribe(
      response => {
        console.log('Personnel unassigned successfully:', response);
        // Optionally refresh the personnel list after unassigning
        this.ngOnInit();
      },
      error => {
        console.error('Erreur lors de la désaffectation du personnel:', error);
        // Inspect error object for more details
        console.log('Detailed Error:', error.error);
      }
    );
  }
  
}


