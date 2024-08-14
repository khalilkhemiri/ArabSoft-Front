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
import { AuthGuard } from 'src/app/services/auth.guard';
import { ChangementsituationComponent } from 'src/app/pages/changementsituation/changementsituation.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'tables',         component: TablesComponent , canActivate: [AuthGuard]},
    { path: 'icons',          component: IconsComponent , canActivate: [AuthGuard]},
    { path: 'maps',           component: MapsComponent , canActivate: [AuthGuard]},
    { path: 'conge',           component: CongeComponent , canActivate: [AuthGuard]},
    { path: 'pret',           component: PretComponent , canActivate: [AuthGuard]},
    { path: 'autorisation',           component: AutorisationComponent, canActivate: [AuthGuard] },
    { path: 'historique',           component: HistoriqueComponent, canActivate: [AuthGuard] },
    { path: 'doc',           component: DocumentComponent, canActivate: [AuthGuard] },
    { path: 'chefempl',           component: ChefEmplComponent , canActivate: [AuthGuard]},
    { path: 'dashchef',           component: ChefDemandeComponent , canActivate: [AuthGuard]},
    { path: 'situation',           component: ChangementsituationComponent , canActivate: [AuthGuard]},



];
