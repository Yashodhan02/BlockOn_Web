import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ColorPickerModule } from 'ngx-color-picker';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MatNativeDateModule } from '@angular/material/core';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CashbackRoutes } from './cashback.routing.module';
import { ViewCashbackBlocksComponent } from './view-cashback-blocks/view-cashback-blocks.component';
import { CreateCashbackSchemeComponent } from './create-cashback-scheme/create-cashback-scheme.component';
//  import { NumberToWordsPipe } from '../numberToWords.pipe';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CashbackBlockRequestsComponent } from './cashback-block-requests/cashback-block-requests.component';
import { SettleCashbackRequestsComponent } from './settle-cashback-requests/settle-cashback-requests.component';
import { ImportBankDisbursalsComponent } from './import-bank-disbursals/import-bank-disbursals.component';
import { AdminComponentsModule } from "../admin/admin-components.module";
import { ViewBlockSchemeComponent } from '../admin/view-block-scheme/view-block-scheme.component';
import { ViewCashbackBlockSchemeComponent } from './view-cashback-block-scheme/view-cashback-block-scheme.component';
import { IssueCashbackBlocksToStoreComponent } from './issue-cashback-blocks-to-store/issue-cashback-blocks-to-store.component';


@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        // NumberToWordsPipe,
        ViewCashbackBlocksComponent,
        CreateCashbackSchemeComponent,
        CashbackBlockRequestsComponent,
        SettleCashbackRequestsComponent,
        ImportBankDisbursalsComponent,
        ViewCashbackBlockSchemeComponent,
        IssueCashbackBlocksToStoreComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(CashbackRoutes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TablerIconsModule.pick(TablerIcons),
        MatNativeDateModule,
        MatCardModule,
        Ng2SearchPipeModule,
        NgxQRCodeModule,
        AdminComponentsModule,
        ColorPickerModule
    ]
})
export class CashbackModule { }
