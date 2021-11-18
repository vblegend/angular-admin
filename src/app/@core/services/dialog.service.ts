import { Injectable } from '@angular/core';
import { NbWindowRef, NbWindowService, NbWindowState } from '@nebular/theme';
import { TerminalComponent } from '../components/windows/terminal.component/terminal.component';
import { ThemeSettingComponent } from '../components/windows/theme.setting.component/theme.setting.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private windowService: NbWindowService) {
  }


  public createTerminalWindow(): NbWindowRef {
    return this.windowService.open(TerminalComponent, {
      title: 'Bash',
      initialState: NbWindowState.FULL_SCREEN,
      windowClass: 'terminal',
      hasBackdrop: false,
      closeOnEsc: false
    });
  }


  public createThemeWindow(): NbWindowRef {
    return this.windowService.open(ThemeSettingComponent, {
      title: 'Theme Setting',
      initialState: NbWindowState.FULL_SCREEN,
      windowClass: 'terminal',
      hasBackdrop: true,
      closeOnBackdropClick: false,
      closeOnEsc: false,
      buttons: {
        maximize: false,
        minimize: false
      }
    });
  }


}
