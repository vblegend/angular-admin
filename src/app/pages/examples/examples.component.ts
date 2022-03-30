import { Component, ElementRef, HostListener, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { ViewCanvasComponent } from '@hmi/components/view-canvas/view.canvas.component';

@Component({
  selector: 'ngx-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.less']
})
export class ExamplesComponent extends GenericComponent {

  public autoScale: boolean;
  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);

    this.autoScale = true;
  }

}
