import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsStudentPage } from './forms-student.page';

const routes: Routes = [
  {
    path: '',
    component: FormsStudentPage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsStudentPageRoutingModule {}
