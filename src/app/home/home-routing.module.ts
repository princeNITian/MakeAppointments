import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
      children: [
      {
        path: 'appointment',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./appointment/appointment.module').then(m => m.AppointmentPageModule)
          }
        ]
      },
      {
        path: 'appointment-list',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./appointment-list/appointment-list.module').then(m => m.AppointmentListPageModule)
          }
        ]
      },
      {
        path: 'contact',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./contact/contact.module').then(m => m.ContactPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/appointment',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then( m => m.AppointmentPageModule)
  },
  {
    path: 'appointment-list',
    loadChildren: () => import('./appointment-list/appointment-list.module').then( m => m.AppointmentListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
