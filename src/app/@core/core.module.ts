import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule, MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { NbAuthModule } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';

import {
  LayoutService,
  PlayerService,
  StateService,
} from './utils';

import { RippleService } from './utils/ripple.service';
import { RestfulService } from './services/restful.service';
import { AuthGuardService } from './services/auth.guard.service';
import { DialogService } from './services/dialog.service';
import { AccountService } from './services/account.service';
import { EarningService } from './services/earning.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbProgressBarModule, NbRadioModule, NbSelectModule, NbSpinnerModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ThemeModule } from '../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { LoginPageComponent } from './components/login/loginpage.component';
import { ThemeSettingComponent } from './components/windows/theme.setting.component/theme.setting.component';
import { TerminalComponent } from './components/windows/terminal.component/terminal.component';
import * as echarts from 'echarts';
import { GuestRoleProvider } from './services/guest.role.provider';
import { CommonService } from './services/common.service';
import { DefaultPipe } from './pipes/default.pipe';
import { TranslatorPipe } from './pipes/translator.pipe';
import { DocumentTitleService } from './services/document.title.service';
import { NetWorkService } from './services/network.sevrice';
import { Exception } from './common/exception';
import { NotFoundComponent } from './components/notfound/not-found.component';


const PIPES = [
  DefaultPipe,
  TranslatorPipe
];


/**
 * custom providers services
 */
const SERVICES = [
  DocumentTitleService,
  RestfulService,
  AuthGuardService,
  DialogService,
  AccountService,
  EarningService,
  CommonService,
  NetWorkService
];

/**
 * EXPORT CONPONENTS
 */
const EXPORT_COMPONENTS = [
  LoginPageComponent,
  NotFoundComponent,
  ThemeSettingComponent,
  TerminalComponent,
];


/**
 * theme material modules
 */
const THEME_MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatButtonModule,
  MatButtonToggleModule,
];

/**
 *  nb core services
 */
export const NB_CORE_PROVIDERS = [
  { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useExisting: RippleService },
  { provide: NbRoleProvider, useClass: GuestRoleProvider },
  ...NbAuthModule.forRoot().providers,
  NbSecurityModule.forRoot({ accessControl: { guest: { view: '*' } } }).providers,
  LayoutService,
  PlayerService,
  StateService
];


@NgModule({
  imports: [
    CommonModule,
    NbActionsModule,
    NbRadioModule,
    NbDatepickerModule,
    NbLayoutModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    RouterModule,
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    ChartModule,
    NbSpinnerModule,
    DragDropModule,
    NbProgressBarModule,
    NgxEchartsModule.forRoot({ echarts }),
    NgxChartsModule,
    ...THEME_MATERIAL_MODULES,
  ],
  exports: [
    NbAuthModule
  ],
  declarations: [
    ...EXPORT_COMPONENTS
  ],
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, private documentTitleService: DocumentTitleService, private networkService: NetWorkService) {
    // documentTitleService.globalSuffix = { value: 'Hello ', needsTranslator: false };
    documentTitleService.defaultTitle = { value: 'Administrator System', needsTranslator: false };
    // documentTitleService.globalPrefix = { value: ' - admin', needsTranslator: false };

    documentTitleService.register();


    this.test();




    if (parentModule) {
      throw new Error(`${'CoreModule'} has already been loaded. Import Core modules in the AppModule only.`);
    }

  }



  private async test() {
    try {
      await this.networkService.send('dasds', '12345', 10000);
    } catch (e) {
      if (e instanceof Exception) {
        console.error(e.toString());
      } else {
        console.error(e);
      }
    }
  }






  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
        ...SERVICES,
        ...PIPES,
      ]
    };
  }
}
