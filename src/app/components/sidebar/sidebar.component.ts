import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    children?: RouteInfo[]; // Add this line to support nested routes
    isOpen?: boolean; // Add this line

}
export const ROUTESADMIN: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/maps', title: 'Users', icon: 'ni-circle-08 text-orange', class: '' }, // Corrected to a user icon
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/tables', title: 'New Users', icon: 'ni-bullet-list-67 text-red', class: '' },
  { path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '' },
  
   // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
   // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];
export const ROUTES: RouteInfo[] = [
  { path: '/dashchef', title: 'Dashboard',  icon:'ni-tv-2 text-primary', class: '' },
  { path: '/chefempl', title: 'My personnels',  icon:'ni-bullet-list-67 text-red', class: '' },
  {
    path: '/demande',
    title: 'Demande',
    icon: 'ni-send text-blue',
    class: '',
    isOpen: false, 
    children: [
      { path: '/conge', title: 'Congé', icon: 'ni-calendar-grid-58 text-yellow', class: '' },
      { path: '/pret', title: 'Pret', icon: 'ni-money-coins text-red', class: '' },
      { path: '/doc', title: 'DocumentAdministratif', icon: 'ni-single-copy-04 text-info', class: '' },
      { path: '/autorisation', title: 'Autorisation', icon: 'ni-check-bold text-orange', class: '' },

    ]
  },
  { path: '/user-profiles', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },

 // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
 // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];
export const PERS: RouteInfo[] = [
  { path: '/ ', title: 'Dash', icon: 'ni-tv-2 text-primary', class: '' },
  {
    path: '/demande',
    title: 'Demande',
    icon: 'ni-send text-blue',
    class: '',
    isOpen: false, 
    children: [
      { path: '/conge', title: 'Congé', icon: 'ni-calendar-grid-58 text-yellow', class: '' },
      { path: '/pret', title: 'Pret', icon: 'ni-money-coins text-red', class: '' },
      { path: '/doc', title: 'DocumentAdministratif', icon: 'ni-single-copy-04 text-info', class: '' },
      { path: '/autorisation', title: 'Autorisation', icon: 'ni-check-bold text-orange', class: '' },

    ]
  },
  { path: '/historique', title: 'Historique', icon: 'ni-time-alarm text-red', class: '' },
];



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public Admin: any[];
  public isCollapsed = true;
  public personel: any[];
  public chef: any[];

  user: any;
  constructor(private router: Router) { }
  
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.user);
    this.Admin = ROUTESADMIN.filter(menuItem => menuItem);
    this.personel = PERS.filter(menuItem => menuItem);
    this.chef = ROUTES.filter(menuItem => menuItem);

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  toggleMenu(menuItem: RouteInfo) {
    if (menuItem.children) {
      menuItem.isOpen = !menuItem.isOpen;
    } else {
      console.log('Navigating to:', menuItem.path);
      this.router.navigate([menuItem.path]);
    }
  }
}
