import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './stuhome/tab1.page'; 

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },

  { 
    path: 'tab1/:username', 
    component: Tab1Page 
  },

  {
    path: 'login',
    loadChildren: () => import('./cordhome/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'registration',
    loadChildren: () => import('./cordlogs/registration.module').then( m => m.RegistrationPageModule)
  },

  {
    path: 'forgot-password',
    loadChildren: () => import('./givereport/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },

  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)   
  },
  {
    path: 'tabadmin',
    loadChildren: () => import('./tabadmin/tabadmin.module').then( m => m.TabadminPageModule)
  },

  {
    path: 'tabadmin1',
    loadChildren: () => import('./givesanction/tabadmin1.module').then( m => m.Tabadmin1PageModule)
  },
  
  {
    path: 'tabadmin3',
    loadChildren: () => import('./cordnotif/tabadmin3.module').then( m => m.Tabadmin3PageModule)
  },

  {
  path: 'osdhome',
  loadChildren: () => import('./osdhome/osdhome.module').then( m => m.OsdhomePageModule)
  },

  {
    path: 'osdlogs',
    loadChildren: () => import('./osdlogs/osdlogs.module').then( m => m.OsdlogsPageModule)
  },

  {
    path: 'osdnotif',
    loadChildren: () => import('./osdnotif/osdnotif.module').then( m => m.OsdnotifPageModule)
  },

  {
    path: 'tabhead',
    loadChildren: () => import('./tabhead/tabhead.module').then( m => m.TabheadPageModule)
  },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
