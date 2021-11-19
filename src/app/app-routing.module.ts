import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from './@core/components/login/loginpage.component';
import { AuthGuardService } from './@core/services/auth.guard.service';
import { NotFoundComponent } from './@core/components/notfound/not-found.component';



export const routes: Routes = [
  {
    data: { title: "" },
    path: 'pages',
    title: { value: 'pages' },
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    title: { value: 'login' },
    component: LoginPageComponent
  },
  { path: 'pages', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: 'notfound',
    title: { value: 'not found' },
    component: NotFoundComponent
  },
  { path: '**', redirectTo: 'notfound' }


];

const config: ExtraOptions = {
  useHash: false
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
