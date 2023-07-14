import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabadminPageRoutingModule } from './tabadmin-routing.module';

import { TabadminPage } from './tabadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabadminPageRoutingModule
  ],
  declarations: [TabadminPage]
})
export class TabadminPageModule {}