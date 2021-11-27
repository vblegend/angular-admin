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
import { IconsProviderModule } from './icons-provider.module';
import { BootstrapService } from '@core/services/bootstrap.service';
import { NetWorkService } from '@core/services/network.sevrice';
import { CoreModule } from '@core/core.module';
import { DocumentTitleService } from '@core/services/document.title.service';
import { Exception } from '@core/common/exception';
import { ThemeService, ThemeStyle } from '@core/services/theme.service';
import { NzIconService } from 'ng-zorro-antd/icon';
import { DynamicModule } from './@dynamic/dynamic.module';
registerLocaleData(zh);



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    CoreModule.forRoot(),
    DynamicModule.forRoot(),
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




  constructor(private bootstrapService: BootstrapService,
    private netWorkService: NetWorkService,
    private themeService: ThemeService,
    private documentTitleService: DocumentTitleService,
    private networkService: NetWorkService,
    private iconService: NzIconService) {

    themeService.changeTheme(ThemeStyle.Default);
    // console.warn('initialization App Module');
    bootstrapService.loadingElement = document.getElementById('global-spinner');

    documentTitleService.defaultTitle = { value: 'Administrator System', needsTranslator: false };
    documentTitleService.register();
    bootstrapService.runAtBootstrap(this.init, this);

    // register iconfont
    this.iconService.fetchFromIconfont({
      scriptUrl: 'assets/fonts/iconfont.js'
    });
  }


  private async init(): Promise<void> {
    this.netWorkService.url = 'ws://127.0.0.1:8000/ws/test';
    try {
      const state = await this.netWorkService.connection();
      if (!state) throw Exception.build('app init', 'failed to connect to server!');
      console.time('websocket');
      const list: Promise<string>[] = [];

      for (let i = 0; i < 1000; i++) {
        list.push(this.networkService.send<string, string>('dasds', `data-${Math.random() * 1000000}`, 10000));
        // .then(result => {
        //   console.log(`result：${result}`);
        // });
      }
      await Promise.all(list);
      console.timeEnd('websocket');
    } catch (e) {
    }
  }






}
