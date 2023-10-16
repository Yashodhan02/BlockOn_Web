import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { MatNativeDateModule } from '@angular/material/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ExportStoresRoutes } from './export-stores.routing.module';
import { ExportStoresComponent } from './export-stores/export-stores.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ExportStoresRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    Ng2SearchPipeModule,
    NgxQRCodeModule
  ],
  declarations: [
    ExportStoresComponent
  ],

})
export class ExportStoresModule {}
