import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from '../@core/components/notfound/not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
// import { ButtonsComponent } from './buttons/buttons.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'welcome',
      component: WelcomeComponent
    },
    {
      path: 'dashboard',
      title: { value: 'dashboard', needsTranslator: true },
      // component: DashboardComponent
    },
    {
      path: 'buttons',
      title: { value: 'buttons', needsTranslator: true },
      // component: ButtonsComponent
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
