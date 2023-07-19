import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabheadPage } from './tabhead.page';

const routes: Routes = [   {
  path: '',
  component: TabheadPage,
  children: [
    {
      path: 'osdhome',
      loadChildren: () => import('../osdhome/osdhome.module').then( m => m.OsdhomePageModule)
    },
    {
      path: 'osdlogs',
      loadChildren: () => import('../osdlogs/osdlogs.module').then( m => m.OsdlogsPageModule)
    },
    {
      path: 'osdnotif',
      loadChildren: () => import('../osdnotif/osdnotif.module').then( m => m.OsdnotifPageModule)
    },
    {
      path: '',
      redirectTo: '/tabhead/osdhome',
      pathMatch: 'full'
    }
  ]   }, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabheadPageRoutingModule {}
