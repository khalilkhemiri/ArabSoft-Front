import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  basicData: any;
  basicOptions: any;

  constructor(private demandesService: AuthService) {}

  ngOnInit() {
    // Appel des deux services et création des datasets
    this.demandesService.getDemandesParMois().subscribe(allDemandesData => {
      const allLabels = Object.keys(allDemandesData);
      const allValues = Object.values(allDemandesData);

      this.demandesService.getDemandesParMoisApprouvez().subscribe(approvedDemandesData => {
        const approvedValues = Object.values(approvedDemandesData);

        this.basicData = {
          labels: allLabels,
          datasets: [
            {
              label: 'All Demandes',
              backgroundColor: '#42A5F5',
              data: allValues
            },
            {
              label: 'Approved Demandes',
              backgroundColor: '#FFA726',
              data: approvedValues
            }
          ]
        };
      });
    });
  
    this.applyLightTheme();
  }


  applyLightTheme() {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
    
  }

  

}
