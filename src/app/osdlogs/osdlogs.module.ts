import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OsdlogsPageRoutingModule } from './osdlogs-routing.module';

import { OsdlogsPage } from './osdlogs.page';

import { ReportModalComponent } from './report-modal.component';
import { ReportModalComponent1 } from './modal-status.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OsdlogsPageRoutingModule
  ],
  declarations: [OsdlogsPage,ReportModalComponent,ReportModalComponent1]
})
export class OsdlogsPageModule {}
