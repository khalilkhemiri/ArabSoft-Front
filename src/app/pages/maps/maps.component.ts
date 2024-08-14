import { Component, OnInit } from '@angular/core';
import { Customer, Representative, UserProfile } from 'src/app/Model/test'; 
import { MessageService } from "primeng/api";
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  providers: [MessageService]
})
export class MapsComponent implements OnInit {
  customers: UserProfile[] = [];
  representatives: Representative[] = [];
  statuses: any[] = [];
  loading: boolean = true;
  activityValues: number[] = [0, 100];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getallusers().subscribe(customers => {
      this.customers = customers;
      this.loading = false;

      this.customers.forEach(customer => {
        customer.date = new Date(customer.date);
        if (customer.chefHierarchique) {
          customer.chefHierarchique.date = new Date(customer.chefHierarchique.date);
        }
      });

      this.representatives = this.customers
        .filter(customer => customer.role === 'CHEF')
        .map(chef => ({
          name: chef.name,
        }));
    }, error => {
      console.error('Error fetching customers', error);
      this.loading = false;
    });

    this.statuses = [
      { label: "Unqualified", value: "unqualified" },
      { label: "Qualified", value: "qualified" },
      { label: "New", value: "new" },
      { label: "Negotiation", value: "negotiation" },
      { label: "Renewal", value: "renewal" },
      { label: "Proposal", value: "proposal" }
    ];
  }

  
}
