import { Routes } from '@angular/router';
import { ExportStoresComponent } from './export-stores/export-stores.component';

export const ExportStoresRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'export-stores',
         component: ExportStoresComponent,
      },
  
    ],
  },
];
