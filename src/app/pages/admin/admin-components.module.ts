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
import { AdminComponentsRoutes } from './admin-components.routing';
import { HomepageComponent } from './homepage/homepage.component';
import { ViewDiscountBlockComponent } from './view-discount-block/view-discount-block.component';
import { CreateBlockonSchemeComponent } from './create-blockon-scheme/create-blockon-scheme.component';
import { ViewBlockSchemeComponent } from './view-block-scheme/view-block-scheme.component';
import { IssueBlocksToStoreComponent } from './issue-blocks-to-store/issue-blocks-to-store.component';
import { StoreSettlementReportComponent } from './store-settlement-report/store-settlement-report.component';
import { ViewNetworkComponent } from './view-network/view-network.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NumberToWordsPipe } from '../numberToWords.pipe';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgxPaginationModule } from 'ngx-pagination'; // Import ngx-pagination module


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    Ng2SearchPipeModule,
    NgxQRCodeModule,
    ColorPickerModule,
    NgxPaginationModule


  ],
  declarations: [
    HomepageComponent,
    ViewDiscountBlockComponent,
    CreateBlockonSchemeComponent,
    ViewBlockSchemeComponent,
    IssueBlocksToStoreComponent,
    StoreSettlementReportComponent,
    ViewNetworkComponent,
    NumberToWordsPipe
    
  ],
  exports: [NumberToWordsPipe]
})
export class AdminComponentsModule {}
