import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OsdlogsPageRoutingModule } from './osdlogs-routing.module';

import { OsdlogsPage } from './osdlogs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OsdlogsPageRoutingModule
  ],
  declarations: [OsdlogsPage]
})
export class OsdlogsPageModule {}
