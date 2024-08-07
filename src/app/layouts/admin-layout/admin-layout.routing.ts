import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { CongeComponent } from 'src/app/pages/conge/conge.component';
import { PretComponent } from 'src/app/pages/pret/pret.component';
import { AutorisationComponent } from 'src/app/pages/autorisation/autorisation.component';
import { HistoriqueComponent } from 'src/app/pages/historique/historique.component';
import { DocumentComponent } from 'src/app/pages/document/document.component';
import { ChefEmplComponent } from 'src/app/pages/chef-empl/chef-empl.component';
import { ChefDemandeComponent } from 'src/app/pages/chef-demande/chef-demande.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'conge',           component: CongeComponent },
    { path: 'pret',           component: PretComponent },
    { path: 'autorisation',           component: AutorisationComponent },
    { path: 'historique',           component: HistoriqueComponent },
    { path: 'doc',           component: DocumentComponent },
    { path: 'chefempl',           component: ChefEmplComponent },
    { path: 'dashchef',           component: ChefDemandeComponent },



];
