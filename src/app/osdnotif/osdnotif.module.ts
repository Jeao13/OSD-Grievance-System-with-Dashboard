import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OsdnotifPageRoutingModule } from './osdnotif-routing.module';

import { OsdnotifPage } from './osdnotif.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OsdnotifPageRoutingModule
  ],
  declarations: [OsdnotifPage]
})
export class OsdnotifPageModule {}
