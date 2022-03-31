import { Component, HostListener, Injector } from '@angular/core';

import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { EventBusMessages, Widget } from '@hmi/core/common';

@Component({
  selector: 'app-img-widget',
  templateUrl: './img.widget.component.html',
  styleUrls: ['./img.widget.component.less']
})
@Widget({
  eventEmits:[],
  eventHandles:[]
})
export class ImgWidgetComponent extends BasicWidgetComponent {

  constructor(injector: Injector) {
    super(injector)
  }


  protected onInit() {
    throw '芭比Q了';
  }

  protected onDestroy() {

  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(ev: MouseEvent): void {
    this.eventBusService.broadcast(this, EventBusMessages.ObjectChanged, 222222);
  }


}
