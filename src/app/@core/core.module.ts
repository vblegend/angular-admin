import { APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, ComponentRef, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatNativeDateModule, MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
// import { NbAuthModule } from '@nebular/auth';
// import { NbSecurityModule, NbRoleProvider } from '@nebular/security';


import { RestfulService } from './services/restful.service';
import { AuthGuardService } from './services/auth.guard.service';
import { DialogService } from './services/dialog.service';
import { AccountService } from './services/account.service';
import { EarningService } from './services/earning.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxEchartsModule } from 'ngx-echarts';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ThemeService } from './services/theme.service';
import { BootstrapService } from './services/bootstrap.service';
import { ErrorComponent } from './components/error/error.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SidebarService } from './services/sidebar.service';



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
  NetWorkService,
  ThemeService,
  BootstrapService,
  SidebarService
];

/**
 * EXPORT CONPONENTS
 */
const EXPORT_COMPONENTS = [
  LoginPageComponent,
  NotFoundComponent,
  ThemeSettingComponent,
  TerminalComponent,
  ErrorComponent
];


/**
 * theme material modules
 */
const THEME_MATERIAL_MODULES = [

];

/**
 *  nb core services
 */
export const NB_CORE_PROVIDERS = [
  // { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useExisting: RippleService },
  // { provide: NbRoleProvider, useClass: GuestRoleProvider },
  // ...NbAuthModule.forRoot().providers,
  // NbSecurityModule.forRoot({ accessControl: { guest: { view: '*' } } }).providers,
  // LayoutService,
  // PlayerService,
  // StateService
];


@NgModule({
  imports: [
    CommonModule,
    // NbActionsModule,
    // NbRadioModule,
    // NbDatepickerModule,
    // NbLayoutModule,
    // NbCheckboxModule,
    // NbAlertModule,
    // NbInputModule,
    // NbButtonModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    NzGridModule,
    NzInputModule,
    RouterModule,
    FormsModule,
    NzSpaceModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzMessageModule,
    // ThemeModule,
    // NbCardModule,
    // NbUserModule,
    // NbIconModule,
    // NbTabsetModule,
    // NbSelectModule,
    // NbListModule,
    // ChartModule,
    // NbSpinnerModule,
    DragDropModule,
    // NbProgressBarModule,
    NgxEchartsModule.forRoot({ echarts }),
    // NgxChartsModule,
    ...THEME_MATERIAL_MODULES,
  ],
  exports: [
    // NbAuthModule
    ...EXPORT_COMPONENTS,
  ],
  declarations: [
    ...EXPORT_COMPONENTS,

  ],
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, private themeService: ThemeService, private documentTitleService: DocumentTitleService, private networkService: NetWorkService) {
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
        {
          provide: APP_BOOTSTRAP_LISTENER,
          useFactory: BootstrapService.BootstrapFactory,
          deps: [BootstrapService],
          multi: true
        },
        {
          provide: APP_INITIALIZER,
          useFactory: BootstrapService.InitializerFactory,
          deps: [BootstrapService],
          multi: true
        }
      ]
    };
  }
}
