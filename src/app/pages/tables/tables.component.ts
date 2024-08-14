import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  users: any[] = [];
  
  chefs: any[] = [];
  selectedRole: string = 'EMPLOYE';
  personnelCount: number = 0; 
  chefCount: number = 0; 
  newCount: number = 0; 
  all: number = 0; 

  constructor(private userProfileService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadChefs();
    this.loadPersonnelCount(); 
    this.loadChefCount();
    this.loadNewCount();
    this.loadAllCount();

  }

  loadUsers(): void {
    this.userProfileService.getUsersByRole(this.selectedRole).subscribe(users => {
      this.users = users;
      this.users.forEach(user => {
        user.selectedRole = '';
        user.selectedChefId = null;
      });
    });
  }

  loadChefs(): void {
    this.userProfileService.getUsersByRole('CHEF').subscribe(chefs => {
      this.chefs = chefs;
    });
  }
  loadAllCount(): void {
      this.all = this.chefCount+this.newCount+this.personnelCount;

    
  }
  loadPersonnelCount(): void {
    this.userProfileService.getUsersByRole('PERSONNEL').subscribe(users => {
      this.personnelCount = users.length;

    });
  }
  loadChefCount(): void {
    this.userProfileService.getUsersByRole('CHEF').subscribe(users => {
      this.chefCount = users.length;

    });
    
  }
  loadNewCount(): void {
    this.userProfileService.getUsersByRole('EMPLOYE').subscribe(users => {
      this.newCount = users.length;
     console.log("new",users)
    });
  }
  onRoleChange(userId: number, newRole: string): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.selectedRole = newRole;
      if (newRole === 'CHEF') {
        this.updateRole(userId, newRole);
      } else if (newRole === 'PERSONNEL' && user.selectedChefId) {
        this.assignPersonnelToChef(userId, user.selectedChefId);
      }
    }
  }

  onChefChange(userId: number, chefId: string): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.selectedChefId = +chefId;
      if (user.selectedRole === 'PERSONNEL') {
        this.assignPersonnelToChef(userId, user.selectedChefId);
      }
    }
  }

  updateRole(userId: number, newRole: string): void {
    this.userProfileService.updateUserRole(userId, newRole).subscribe(() => {
      this.loadUsers();
      this.loadPersonnelCount(); // Mettre à jour le nombre de personnels après un changement de rôle
    });
  }

  assignPersonnelToChef(userId: number, chefId: number): void {
    this.userProfileService.assignPersonnelToChef(userId, chefId).subscribe(() => {
      this.loadUsers();
      this.loadPersonnelCount(); 
    });
  }
}
