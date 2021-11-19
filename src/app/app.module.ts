/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LOCALE_ID } from '@angular/core';
import { NbDialogService, NbIconLibraries, NbIconModule, NbThemeService } from '@nebular/theme';


import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY'
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'zh-CN' }, // replace "de-at" with your locale
    NbDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {



  constructor(private iconLibraries: NbIconLibraries, public themeService: NbThemeService) {
    this.iconLibraries.registerFontPack('ion', { iconClassPrefix: 'ion' });
    this.iconLibraries.registerFontPack('grace', { packClass: 'graceicon', iconClassPrefix: 'grace' });
    this.iconLibraries.setDefaultPack('grace');
    this.themeService.changeTheme('dark');
  }


}
