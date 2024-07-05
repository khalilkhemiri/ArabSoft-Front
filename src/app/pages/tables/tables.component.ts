import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  users: any[] = [];
  selectedRole: string = 'EMPLOYE';

  constructor(private userProfileService : AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userProfileService.getUsersByRole(this.selectedRole).subscribe(users => {
      this.users = users;
    });
  }

  updateRole(userId: number, newRole: string): void {
    this.userProfileService.updateUserRole(userId, newRole).subscribe(() => {
      this.loadUsers();
    });
  }
}
