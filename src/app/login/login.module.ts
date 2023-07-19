import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { PieChartComponent } from './pie-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    NgxChartsModule
  ],
  declarations: [LoginPage,  PieChartComponent]
})
export class LoginPageModule {}
