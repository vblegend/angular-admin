import { Component, ElementRef, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent extends GenericComponent {

  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);


  }




}
