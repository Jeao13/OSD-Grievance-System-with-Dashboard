import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [   {
  path: '',
  component: TabsPage,
  children: [
    {
      path: 'tab1',
      loadChildren: () => import('../stuhome/tab1.module').then(m => m.Tab1PageModule)
    },
    {
      path: 'tab2',
      loadChildren: () => import('../stulogs/tab2.module').then(m => m.Tab2PageModule)
    },
    {
      path: 'tab3',
      loadChildren: () => import('../stunotif/tab3.module').then(m => m.Tab3PageModule)
    },
    {
      path: '',
      redirectTo: '/tabs/tab1',
      pathMatch: 'full'
    }
  ]   }, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
