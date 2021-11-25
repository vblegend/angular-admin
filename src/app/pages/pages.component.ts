import { Component, Injector } from '@angular/core';
import { GenericComponent } from '../@core/components/basic/generic.component';
import { SidebarService } from '../@core/services/sidebar.service';

// import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.less'],
  templateUrl: 'pages.component.html',
})
export class PagesComponent extends GenericComponent {

  /**
   *
   */
  constructor(injector: Injector, public sidebarService: SidebarService) {
    super(injector);
  }

  protected onQueryChanges() {
    console.log(`ngx-pages onRouter ${this.queryParams.get('id')}`);

  }




}


