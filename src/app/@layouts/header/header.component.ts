import { KeyValue } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { Exception } from '@core/common/exception';
import { FixedTimer } from '@core/common/fixedtimer';
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

  public currentTheme: ThemeStyle;
  public today: Date;
  public themes: KeyValue<string, string>[];
  constructor(injector: Injector, public menuService: MenuService, public themeService: ThemeService, private dialogService: DialogService) {
    super(injector);
    this.today = new Date();
  }


  protected onInit(): void {
    this.themes = [];
    this.currentTheme = this.themeService.currentTheme;
    for (const key in this.themeService.themes) {
      this.themes.push({ key, value: this.themeService.themes[key] })
    }
    const timer = this.createTimer(this.timerUpdate);
    timer.interval = 1000;
    timer.start();
  }

  private timerUpdate(timer: FixedTimer): void {
    this.today = new Date();
    timer.start();
  }



  public changeTheme(event: ThemeStyle) {
    this.themeService.changeTheme(event);
    this.commonService.session.set('theme', event);
  }




  public tclick(): void {
    this.dialogService.createTerminalWindow();
  }

  public throwError() {
    throw Exception.build('test Global Error Handle', 'ZHE......');
  }


  public logout():void{
    this.commonService.session.remove('user');
    this.navigate('../login');
  }






}
