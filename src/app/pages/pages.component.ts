import { Component } from '@angular/core';
import { SidebarService } from '../@core/services/sidebar.service';

// import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  templateUrl: 'pages.component.html',
})
export class PagesComponent {

  /**
   *
   */
  constructor(public sidebarService: SidebarService) {
    
  }

}


