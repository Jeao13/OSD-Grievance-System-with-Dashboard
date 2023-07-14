import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormsStudentPageRoutingModule } from './forms-student-routing.module';

import { FormsStudentPage } from './forms-student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsStudentPageRoutingModule
  ],
  declarations: [FormsStudentPage]
})
export class FormsStudentPageModule {}
