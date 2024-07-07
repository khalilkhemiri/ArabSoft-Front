import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTESADMIN: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
   // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
   // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
  { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
  { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
 // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
 // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];
export const PERS: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/', title: 'Demande ',  icon:'ni-planet text-blue', class: '' },
  { path: '/Autorisation', title: 'Autorisation ',  icon:'ni-pin-3 text-orange', class: '' },
  { path: '/conge', title: 'Congé',  icon:'ni-single-02 text-yellow', class: '' },
  { path: '/Pret', title: 'Pret',  icon:'ni-bullet-list-67 text-red', class: '' },

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
  user: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
console.log(this.user);
    this.Admin = ROUTESADMIN.filter(menuItem => menuItem);
    this.personel = PERS.filter(menuItem => menuItem);

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
