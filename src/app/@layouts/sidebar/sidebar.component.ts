import { Component, Injector } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { RouteConfigure } from '@core/models/RouteConfigure';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent extends GenericComponent {
  constructor(injector: Injector, public sidebarService: SidebarService) {
    super(injector);
  }

  public menus: RouteConfigure[];


  protected onInit(): void {
    this.menus = this.sidebarService.menus;

    // console.log(`app-sidebar ngOnInit`);
  }
}
