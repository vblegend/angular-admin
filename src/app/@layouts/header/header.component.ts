import { KeyValue } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { Exception } from '@core/common/exception';
import { GenericComponent } from '@core/components/basic/generic.component';
import { DialogService } from '@core/services/dialog.service';
import { MenuService } from '@core/services/menu.service';
import { ThemeService, ThemeStyle } from '@core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent extends GenericComponent {
  isCollapsed = false;
  public currentTheme: ThemeStyle;
  public themes: KeyValue<string, string>[];
  constructor(injector: Injector, public menuService: MenuService, public themeService: ThemeService , private dialogService:DialogService) {
    super(injector);
  }


  protected onInit(): void {
    this.themes = [];
    this.currentTheme = this.themeService.currentTheme;
    for (const key in this.themeService.themes) {
      this.themes.push({ key, value: this.themeService.themes[key] })
    }

  }

  public changeTheme(event: ThemeStyle) {
    this.themeService.changeTheme(event);
  }




  public tclick(): void{
    this.dialogService.createTerminalWindow();
  }

  public throwError(){
    throw Exception.build('test Global Error Handle','ZHE......');
  }

}
