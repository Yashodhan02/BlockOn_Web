import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

const routes: Routes = [
  // {path:'home',component:HomepageComponent},

  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./pages/admin/admin-components.module').then((m) => m.AdminComponentsModule),
      },
      {
        path: 'cobranded',
        loadChildren: () =>
          import('./pages/co-branded/co-branded.module').then((m) => m.CobrandedModule),
          canActivate: [AuthGuard] 
      },
      {
        path: 'cashback',
        loadChildren: () =>
          import('./pages/cashback/cashback.module').then((m) => m.CashbackModule),
      },
      {
        path: 'campaingn',
        loadChildren: () =>
          import('./pages/manageCampaingns/manage-campaings.module').then((m) => m.ManageCampaingsModule)
      },
      {
        path: 'export',
        loadChildren: () =>
           import('./pages/ExoprtStores/export-stores.module').then((m) => m.ExportStoresModule)
          
      },
      {
        path: 'profile',
        loadChildren: () =>
        import('./pages/profile/profile.module').then((m)=> m.ProfileComponentsModule)
      },
      {
        path: 'common',
        loadChildren: () =>
        import('./pages/common/common-components.module').then((m)=> m.CommonComponentsModule)
      },
    
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
