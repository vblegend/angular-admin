import { APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, ComponentRef, ErrorHandler, Injector, ModuleWithProviders, NgModule, Optional, Provider, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatNativeDateModule, MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
// import { NbAuthModule } from '@nebular/auth';
// import { NbSecurityModule, NbRoleProvider } from '@nebular/security';


import { RestfulService } from './services/restful.service';
import { AuthGuardService } from './services/auth.guard.service';
import { DialogService } from './services/dialog.service';
import { AccountService } from './services/account.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login/loginpage.component';
import { ThemeSettingComponent } from './components/windows/theme.setting.component/theme.setting.component';
import { TerminalComponent } from './components/windows/terminal.component/terminal.component';
import { CommonService } from './services/common.service';
import { DefaultPipe } from './pipes/default.pipe';
import { TranslatorPipe } from './pipes/translator.pipe';
import { DocumentTitleService } from './services/document.title.service';
import { NetWorkService } from './services/network.sevrice';
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
import { MenuService } from './services/menu.service';
import { HoverDirective } from './directives/HoverDirective';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { GlobalErrorHandler } from './private/GlobalErrorHandler';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { TemplateService } from './services/template.service';






const EXPORT_PIPES: Provider[] = [
  DefaultPipe,
  TranslatorPipe
];


const EXPORT_DIRECTIVES: Provider[] = [
  HoverDirective
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
 * custom providers services
 */
const PROVIDERS: Provider[] = [
  DocumentTitleService,
  RestfulService,
  AuthGuardService,
  DialogService,
  AccountService,
  CommonService,
  NetWorkService,
  ThemeService,
  BootstrapService,
  MenuService,
  TemplateService
];





@NgModule({
  imports: [
    CommonModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    NzGridModule,
    NzInputModule,
    RouterModule,
    NzFormModule,
    FormsModule,
    NzModalModule,
    NzSpaceModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzNotificationModule,
    NzMessageModule,
    DragDropModule,
    NzAvatarModule,
    NzPopoverModule
  ],
  exports: [
    EXPORT_COMPONENTS,
    EXPORT_DIRECTIVES,
    EXPORT_PIPES
  ],
  declarations: [
    EXPORT_COMPONENTS,
    EXPORT_DIRECTIVES,
    EXPORT_PIPES,
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, private themeService: ThemeService, private documentTitleService: DocumentTitleService, private networkService: NetWorkService) { }


  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...PROVIDERS,
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
        },
        {
          provide: ErrorHandler,
          useClass: GlobalErrorHandler,
          deps: [NzNotificationService, TemplateService]
        }
      ]
    };
  }
}
