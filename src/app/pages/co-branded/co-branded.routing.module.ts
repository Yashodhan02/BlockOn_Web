import { Routes } from '@angular/router';
import { CoBrandedIssueBlocksToStoreComponent } from './co-branded-issue-blocks-to-store/co-branded-issue-blocks-to-store.component';
import { CreateCoBrandedBlocksComponent } from './create-co-branded-blocks/create-co-branded-blocks.component';
import { ViewCoBrandedBlockSchemeComponent } from './view-co-branded-block-scheme/view-co-branded-block-scheme.component';
import { ViewCoBrandedBlocksComponent } from './view-co-branded-blocks/view-co-branded-blocks.component';
import { ViewCoBrandedReportComponent } from './view-co-branded-report/view-co-branded-report.component';

export const CobrandedRoutes: Routes = [
  {
    path: '',
    children: [
        {
            path: 'view-co-branded-blocks',
            component: ViewCoBrandedBlocksComponent,
          },
          {
            path: 'create-co-branded-blocks',
            component: CreateCoBrandedBlocksComponent,
          },
          {
            path: 'co-branded-issue-blocks',
            component: CoBrandedIssueBlocksToStoreComponent,
          },
          {
            path: 'view-co-branded-block-scheme',
            component: ViewCoBrandedBlockSchemeComponent,
          },
          {
            path: 'view-co-branded-report',
            component: ViewCoBrandedReportComponent,
          },
          
    ],
    
  },
];
