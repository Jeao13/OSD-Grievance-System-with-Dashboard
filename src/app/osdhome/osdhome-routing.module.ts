import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OsdhomePage } from './osdhome.page';

const routes: Routes = [
  {
    path: '',
    component: OsdhomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OsdhomePageRoutingModule {}
