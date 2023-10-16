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
import { ManageCampaingsRoutes } from './manage-campaings.routing.module';
import { ManageCampaingnComponent } from './manage-campaingn/manage-campaingn.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ManageCampaingsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    Ng2SearchPipeModule,
    NgxQRCodeModule
  ],
  declarations: [
    ManageCampaingnComponent
  ],

})
export class ManageCampaingsModule {}
