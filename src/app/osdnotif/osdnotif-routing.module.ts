import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OsdnotifPage } from './osdnotif.page';

const routes: Routes = [
  {
    path: '',
    component: OsdnotifPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OsdnotifPageRoutingModule {}
