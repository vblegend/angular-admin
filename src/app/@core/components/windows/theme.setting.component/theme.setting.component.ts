import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';


import { StringNameValue } from '../../../../../typings';





@Component({
  selector: 'ngx-theme-setting-component',
  styleUrls: ['./theme.setting.component.less'],
  templateUrl: './theme.setting.component.html'
})
export class ThemeSettingComponent implements OnInit, OnDestroy {
  @ViewChild('TerminalParent', { static: true }) private terminalDiv: ElementRef;
  public themes: StringNameValue[] = [
    {
      value: 'default',
      name: 'Light'
    },
    {
      value: 'dark',
      name: 'Dark'
    },
    {
      value: 'cosmic',
      name: 'Cosmic'
    },
    {
      value: 'corporate',
      name: 'Corporate'
    },
    {
      value: 'material-light',
      name: 'Material Light'
    },
    {
      value: 'material-dark',
      name: 'Material Dark'
    }
  ];
  public constructor() {

  }

  public changeTheme(themeName: string): void {
    // this.themeService.changeTheme(themeName);
    // this.windowRef.close();
  }


  public ngOnInit(): void {

  }

  public ngOnDestroy(): void {

  }


}
