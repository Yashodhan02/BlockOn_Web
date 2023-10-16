import { Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';



export const ProfileComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
     
    ],
  },
];
