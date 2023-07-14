import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';

import { ReportModalComponent } from './report-modal.component';

import { ReportModalComponent1 } from './modal-status.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule
  ],
  declarations: [RegistrationPage,ReportModalComponent,ReportModalComponent1]
})
export class RegistrationPageModule {}
