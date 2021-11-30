import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'welcome/:id',
      title: { value: 'Wel Come', needsTranslator: false },
      component: WelcomeComponent
    },
    {
      path: 'dashboard',
      title: { value: 'dashboard', needsTranslator: true },
      component: WelcomeComponent
    },
    {
      path: 'tasks',
      title: { value: '计划任务', needsTranslator: false },
      loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule),
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
