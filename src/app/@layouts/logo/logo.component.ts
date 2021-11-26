import { Component, Injector,  } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.less']
})
export class LogoComponent extends GenericComponent {

  constructor(injector: Injector, public sidebarService: SidebarService) {
    super(injector);
  }


  protected onInit(): void {
    // console.log(`app-logo onInit`);
  }
  protected onDestroy() {
    console.log(`app-welcome onDestroy`);
  }
}
