import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { CongeComponent } from './pages/conge/conge.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { PretComponent } from './pages/pret/pret.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutorisationComponent } from './pages/autorisation/autorisation.component';
import { MatRadioModule } from '@angular/material/radio'; 
import {CalendarModule} from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { HistoriqueComponent } from './pages/historique/historique.component';
import {ToastModule} from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';
import { ConfirmationService } from 'primeng/api';
import {TableModule} from 'primeng/table';
import { DocumentComponent } from './pages/document/document.component';
import { ChefEmplComponent } from './pages/chef-empl/chef-empl.component';
import { ChefDemandeComponent } from './pages/chef-demande/chef-demande.component';
import { MeetingComponent } from './pages/meeting/meeting.component';
import { ChangementsituationComponent } from './pages/changementsituation/changementsituation.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    ReactiveFormsModule,
    InputNumberModule,
    ConfirmDialogModule,
    CalendarModule,
    DialogModule,
    ButtonModule,
    TableModule,
    ToastModule,
    MenuModule,
    ChartModule,
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    CongeComponent,
    PretComponent,
    AutorisationComponent,
    HistoriqueComponent,
    DocumentComponent,
    ChefEmplComponent,
    ChefDemandeComponent,
    MeetingComponent,
    ChangementsituationComponent,
    
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
