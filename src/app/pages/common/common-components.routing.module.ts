import { Routes } from '@angular/router';
import { PickImagesComponent } from './pick-images/pick-images.component';





export const CommonComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pick-images',
        component: PickImagesComponent,
      },
     
    ],
  },
];
