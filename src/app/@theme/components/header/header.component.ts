import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbColorHelper, NbIconConfig, NbMediaBreakpointsService, NbMenuItem, NbMenuService, NbSidebarService, NbThemeService, NbWindowService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';
import { DialogService } from '../../../@core/services/dialog.service';
import { StringNameValue } from '../../../../typings';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  public userPictureOnly: boolean = false;
  public user: { name: string, picture: string };
  public capacity: string = 'Hello Administrator';
  public terminalIcon: NbIconConfig = { icon: 'terminal3', pack: 'grace' };
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

  public currentTheme: string = 'dark';

  public userMenu: NbMenuItem[] = [{ title: 'Profile', data: 'profile', icon: 'person-outline' }, { title: 'Log out', data: 'logout', icon: 'settings-outline' }];

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    public themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    protected router: Router,
    private windowService: NbWindowService,
    private dialogService: DialogService
  ) {
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));




  }

  public ngOnInit(): void {

    const themeSubscription = this.themeService.getJsTheme().subscribe(config => {
      const color = NbColorHelper.hexToRgbA(config.variables.primaryLight, 0.8);
      // console.log(color);
    });




    this.user = { name: 'Nick Jones', picture: 'assets/images/nick.png' };

    this.themeService.changeTheme(this.currentTheme);
    // this.currentTheme = this.themeService.currentTheme;
    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
        this.rippleService.toggle(themeName?.startsWith('material'));
      });


    this.menuService.onItemClick().subscribe(e => {
      if (e.item.title === 'Log out') {
        sessionStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    });
    // .pipe(
    //   filter(({ tag }) => tag === 'my-context-menu'),
    //   map(({ item: { title } }) => title),
    // )
    // .subscribe(title => this.window.alert(`${title} was clicked!`));




  }

  public showThemeWindow(): void {
    this.dialogService.createThemeWindow();
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public changeTheme(themeName: string): void {
    this.themeService.changeTheme(themeName);
  }

  public toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  public openTerminal(): void {
    this.dialogService.createTerminalWindow();
  }




  public navigateHome(): boolean {
    this.menuService.navigateHome();
    return false;
  }

  public enumClick(): void {

  }

  public openWindowWithoutBackdrop(): void {

  }


}
