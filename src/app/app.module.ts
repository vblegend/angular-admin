/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, ComponentRef, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LOCALE_ID } from '@angular/core';




import { CommonModule, registerLocaleData } from '@angular/common';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BootstrapService } from './@core/services/bootstrap.service';
import { NetWorkService } from './@core/services/network.sevrice';
import { CoreModule } from './@core/core.module';
import { DocumentTitleService } from './@core/services/document.title.service';
import { Exception } from './@core/common/exception';
import { ThemeService, ThemeStyle } from './@core/services/theme.service';
registerLocaleData(zh);



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    CoreModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IconsProviderModule,


  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'zh-CN' }, // replace "de-at" with your locale
    { provide: NZ_I18N, useValue: zh_CN },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(bootstrapService: BootstrapService,
    netWorkService: NetWorkService,
    themeService: ThemeService,
    documentTitleService: DocumentTitleService,
    private networkService: NetWorkService) {
      themeService.changeTheme(ThemeStyle.Dark);
    console.warn('initialization App Module');
    bootstrapService.loadingElement = document.getElementById('global-spinner');

    documentTitleService.defaultTitle = { value: 'Administrator System', needsTranslator: false };
    // documentTitleService.globalPrefix = { value: ' - admin', needsTranslator: false };
    documentTitleService.register();

    netWorkService.url = 'ws://127.0.0.1:8000/ws/test';
    netWorkService.connection();

    this.test();
  }


  private async test() {
    try {
      await this.networkService.connection();
      await this.networkService.send('dasds', '12345', 10000);
    } catch (e) {
      if (e instanceof Exception) {
        console.error(e.toString());
      } else {
        console.error(e);
      }
    }
  }

}
