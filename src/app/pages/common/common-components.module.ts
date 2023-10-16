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

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CommonComponentsRoutes } from './common-components.routing.module';
import { PickImagesComponent } from './pick-images/pick-images.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CommonComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    Ng2SearchPipeModule,
    NgxQRCodeModule,
    ColorPickerModule
  ],
  declarations: [
    PickImagesComponent,
  
  ],
  exports: []
})
export class CommonComponentsModule {}
