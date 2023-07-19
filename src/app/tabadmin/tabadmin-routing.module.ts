import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabadminPage } from './tabadmin.page';

const routes: Routes = [   {
  path: '',
  component: TabadminPage,
  children: [
    {
      path: 'login',
      loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
    },
    {
      path: 'registration',
    loadChildren: () => import('../registration/registration.module').then( m => m.RegistrationPageModule)
    },
    {
      path: 'tabadmin3',
    loadChildren: () => import('../tabadmin3/tabadmin3.module').then( m => m.Tabadmin3PageModule)
    },
    {
      path: '',
      redirectTo: '/tabadmin/login',
      pathMatch: 'full'
    }
  ]   }, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabadminPageRoutingModule {}