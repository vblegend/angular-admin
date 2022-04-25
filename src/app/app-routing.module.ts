import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WidgetSchemaService } from '@hmi/services/widget.schema.service';
import { ErrorComponent } from './@core/components/error/error.component';
import { LoginPageComponent } from './@core/components/login/loginpage.component';
import { NotFoundComponent } from './@core/components/notfound/not-found.component';
import { AuthGuardService } from './@core/services/auth.guard.service';
import { HmiSchemaService } from './pages/dashboard/service/hmi.schema.service';
import { EditorComponent } from './pages/editor/editor.component';


const routes: Routes = [
  {
    path: 'login',
    title: { value: 'login', needsTranslator: false },
    component: LoginPageComponent
  },
  {
    path: 'editor',
    title: { value: 'editor', needsTranslator: false },
    component: EditorComponent
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
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
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
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
  providers:[
    {
      provide: WidgetSchemaService,
      useClass: HmiSchemaService,
    }
  ]
})
export class AppRoutingModule { }
