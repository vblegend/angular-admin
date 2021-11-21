import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './@core/components/error/error.component';
import { LoginPageComponent } from './@core/components/login/loginpage.component';
import { NotFoundComponent } from './@core/components/notfound/not-found.component';
import { AuthGuardService } from './@core/services/auth.guard.service';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: 'login',
    title: { value: 'login', needsTranslator: false },
    component: LoginPageComponent
  },
  {
    path: 'notfound',
    title: { value: 'not found', needsTranslator: false },
    component: NotFoundComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'error',
    title: { value: 'error', needsTranslator: false },
    component: ErrorComponent,
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
