import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OsdlogsPage } from './osdlogs.page';

const routes: Routes = [
  {
    path: '',
    component: OsdlogsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OsdlogsPageRoutingModule {}
