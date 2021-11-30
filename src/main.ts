/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { COMPILER_OPTIONS, enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'zone.js';  // Included with Angular CLI.
// import { ResourceLoader } from '@angular/compiler';
// import { PrivateResourceLoader } from '@core/private/PrivateResourceLoader';

if (environment.production) {
  enableProdMode();
}


registerLocaleData(zh);

platformBrowserDynamic().bootstrapModule(AppModule, {}).catch(err => console.error(err));
