import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabheadPageRoutingModule } from './tabhead-routing.module';

import { TabheadPage } from './tabhead.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabheadPageRoutingModule
  ],
  declarations: [TabheadPage]
})
export class TabheadPageModule {}
