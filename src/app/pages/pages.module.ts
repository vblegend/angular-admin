import { NgModule } from '@angular/core';


import { PagesComponent } from './pages.component';
// import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
// import { ButtonsComponent } from './buttons/buttons.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { WelcomeComponent } from './welcome/welcome.component';
import { CoreModule } from '../@core/core.module';
import { LayoutModule } from '../layouts/layout.module';

@NgModule({
  imports: [
    // NbIconModule,
    // NbCardModule,
    // NbActionsModule,
    // NbButtonModule,
    // ThemeModule,
    // NbMenuModule,
    // DashboardModule,
    LayoutModule.forRoot(),
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    PagesRoutingModule,
  ],
  declarations: [
    PagesComponent,
    WelcomeComponent,
    // SidebarComponent,
    // HeaderComponent,
    // FooterComponent,
    // ButtonsComponent,
  ],
  providers: [
    // otherProviders...
  ]
})
export class PagesModule {
}
