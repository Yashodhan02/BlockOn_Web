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
import { CobrandedRoutes } from './co-branded.routing.module';
import { ViewCoBrandedBlocksComponent } from './view-co-branded-blocks/view-co-branded-blocks.component';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CreateCoBrandedBlocksComponent } from './create-co-branded-blocks/create-co-branded-blocks.component';
import { CoBrandedIssueBlocksToStoreComponent } from './co-branded-issue-blocks-to-store/co-branded-issue-blocks-to-store.component';
import { ViewCoBrandedBlockSchemeComponent } from './view-co-branded-block-scheme/view-co-branded-block-scheme.component';
import { ViewCoBrandedReportComponent } from './view-co-branded-report/view-co-branded-report.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgxPaginationModule } from 'ngx-pagination'; // Import ngx-pagination module

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CobrandedRoutes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TablerIconsModule.pick(TablerIcons),
        MatNativeDateModule,
        MatCardModule,
        Ng2SearchPipeModule,
        NgxQRCodeModule,
        ColorPickerModule,
        NgxPaginationModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
       ViewCoBrandedBlocksComponent,
       CreateCoBrandedBlocksComponent,
       CoBrandedIssueBlocksToStoreComponent,
       ViewCoBrandedBlockSchemeComponent,
       ViewCoBrandedReportComponent
    ],
})
export class CobrandedModule { }
