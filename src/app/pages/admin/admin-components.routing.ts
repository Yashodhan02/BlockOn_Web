import { Routes } from '@angular/router';
import { CreateBlockonSchemeComponent } from './create-blockon-scheme/create-blockon-scheme.component';
import { HomepageComponent } from './homepage/homepage.component';
import { IssueBlocksToStoreComponent } from './issue-blocks-to-store/issue-blocks-to-store.component';
import { ViewBlockSchemeComponent } from './view-block-scheme/view-block-scheme.component';
import { ViewDiscountBlockComponent } from './view-discount-block/view-discount-block.component';
import { StoreSettlementReportComponent } from './store-settlement-report/store-settlement-report.component';
import { ViewNetworkComponent } from './view-network/view-network.component';


export const AdminComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'homepage',
        component: HomepageComponent,
      },
      {
        path: 'view-discount-block',
        component: ViewDiscountBlockComponent,
      },
      {
        path: 'create-blockon-scheme',
        component: CreateBlockonSchemeComponent,
      },
      {
        path: 'view-blockon-scheme',
        component: ViewBlockSchemeComponent,
      },
      {
        path: 'issue-blocks-to-store',
        component: IssueBlocksToStoreComponent,
      },
      {
        path: 'store-settlement-report',
        component: StoreSettlementReportComponent,
      },
      {
        path: 'view-network',
        component: ViewNetworkComponent,
      },
    ],
  },
];
