import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OsdhomePageRoutingModule } from './osdhome-routing.module';
import { PieChartComponent } from './pie-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OsdhomePage } from './osdhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OsdhomePageRoutingModule,
    NgxChartsModule
  ],
  declarations: [OsdhomePage, PieChartComponent]
})
export class OsdhomePageModule {}
