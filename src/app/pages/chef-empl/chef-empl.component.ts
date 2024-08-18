import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chef-empl',
  templateUrl: './chef-empl.component.html',
  styleUrls: ['./chef-empl.component.css'],
  providers: [ConfirmationService]
})
export class ChefEmplComponent implements OnInit {

  personnels: any[] = [];
  selectedCustomer1: any;
  user:any;
personnel:number;
  constructor(private userProfileService: AuthService,    private confirmationService: ConfirmationService ,private router:Router ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userProfileService.countPersonnelByChef(this.user.id).subscribe(data => {
      this.personnel = data;
    }, error => {
      console.error('Erreur lors de la récupération des personnels', error);
    });
  
    this.userProfileService.getPersonnelsByChef(this.user.id).subscribe(data => {
      this.personnels = data;
    }, error => {
      console.error('Erreur lors de la récupération des personnels', error);
    });
  }
  confirmUnassign(personnelId: number) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir désaffecter ce personnel ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.unassign(personnelId);
      }
    });
  }

  unassign(personnelId: number) {
    this.userProfileService.unassignPersonnel(personnelId).subscribe(
      response => {
        console.log('Personnel unassigned successfully:', response);
        this.ngOnInit();
      },
      error => {
        console.error('Erreur lors de la désaffectation du personnel:', error);
        console.log('Detailed Error:', error.error);
      }
    );
  }
  createMeeting() {
    const roomID = Math.floor(Math.random() * 10000).toString();
    const username = this.user.name; 
    const baseUrl = window.location.origin;

    const meetingUrl = this.router.serializeUrl(this.router.createUrlTree(['/meeting'], { queryParams: { roomID, username } }));
    const fullMeetingUrl = `${baseUrl}${meetingUrl}`;

    const joinUrl = this.router.serializeUrl(this.router.createUrlTree(['/meeting'], { queryParams: { roomID } }));
    const fullJoinUrl = `${baseUrl}${joinUrl}`;

    window.open(fullMeetingUrl, '_blank');

    this.userProfileService.sendMeetingLinkToEmployees(this.user.id, fullJoinUrl).subscribe(
        response => {
            console.log('Meeting link sent to employees:', response);
        },
        error => {
            console.error('Error sending meeting link:', error);
        }
    );
}

  


}


