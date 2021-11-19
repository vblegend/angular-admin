import { NgModule } from '@angular/core';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ButtonsComponent } from './buttons/buttons.component';


@NgModule({
  imports: [
    NbIconModule,
    NbCardModule,
    NbActionsModule,
    NbButtonModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    PagesRoutingModule,
  ],
  declarations: [
    PagesComponent,
    ButtonsComponent,
  ],
  providers: [
    // otherProviders...
  ]
})
export class PagesModule {
}
