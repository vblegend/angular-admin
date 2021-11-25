import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../@core/services/sidebar.service';
import { ThemeService, ThemeStyle } from '../../@core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  isCollapsed = false;
  public currentTheme: ThemeStyle;
  public themes: KeyValue<string, string>[];
  constructor(public sidebarService: SidebarService, public themeService: ThemeService) { }


  public ngOnInit(): void {
    this.themes = [];
    this.currentTheme = this.themeService.currentTheme;
    for (const key in this.themeService.themes) {
      this.themes.push({ key, value: this.themeService.themes[key] })
    }

  }

  public changeTheme(event: ThemeStyle) {
    this.themeService.changeTheme(event);
  }
}
