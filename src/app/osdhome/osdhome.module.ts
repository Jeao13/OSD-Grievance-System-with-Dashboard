import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OsdhomePageRoutingModule } from './osdhome-routing.module';

import { OsdhomePage } from './osdhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OsdhomePageRoutingModule
  ],
  declarations: [OsdhomePage]
})
export class OsdhomePageModule {}
