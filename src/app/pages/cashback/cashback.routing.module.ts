import { Routes } from '@angular/router';
import { CashbackBlockRequestsComponent } from './cashback-block-requests/cashback-block-requests.component';
import { CreateCashbackSchemeComponent } from './create-cashback-scheme/create-cashback-scheme.component';
import { ImportBankDisbursalsComponent } from './import-bank-disbursals/import-bank-disbursals.component';
import { IssueCashbackBlocksToStoreComponent } from './issue-cashback-blocks-to-store/issue-cashback-blocks-to-store.component';
import { SettleCashbackRequestsComponent } from './settle-cashback-requests/settle-cashback-requests.component';
import { ViewCashbackBlockSchemeComponent } from './view-cashback-block-scheme/view-cashback-block-scheme.component';
import { ViewCashbackBlocksComponent } from './view-cashback-blocks/view-cashback-blocks.component';


export const CashbackRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'view-cashback-blocks',
                component: ViewCashbackBlocksComponent,
            },
            {
                path: 'create-cashback-scheme',
                component: CreateCashbackSchemeComponent,
            },
            {
                path: 'cashback-block-request',
                component: CashbackBlockRequestsComponent,
            },
            {
                path: 'settle-cashback-requests',
                component: SettleCashbackRequestsComponent,
            },
            {
                path: 'import-bank-disbursals',
                component: ImportBankDisbursalsComponent,
            },
            {
                path: 'view-cashback-block-scheme',
                component: ViewCashbackBlockSchemeComponent,
            },
            {
                path: 'issue-cashback-blocks-to-store',
                component: IssueCashbackBlocksToStoreComponent,
            },
        ], 
     

    },
];
