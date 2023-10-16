import { Routes } from '@angular/router';
import { ManageCampaingnComponent } from './manage-campaingn/manage-campaingn.component';
export const ManageCampaingsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'manage-campaingn',
        component: ManageCampaingnComponent,
      },
  
    ],
  },
];
