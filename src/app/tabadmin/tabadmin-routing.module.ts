import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabadminPage } from './tabadmin.page';

const routes: Routes = [
  {
    path: '',
    component: TabadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabadminPageRoutingModule {}
