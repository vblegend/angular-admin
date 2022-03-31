import { Component, HostListener, Injector } from '@angular/core';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { EventBusMessages, Widget } from '@hmi/core/common';

@Component({
  selector: 'app-svg-widget',
  templateUrl: './svg.widget.component.html',
  styleUrls: ['./svg.widget.component.less']
})
@Widget()
export class SvgWidgetComponent extends BasicWidgetComponent {

  constructor(injector: Injector) {
    super(injector)
  }

  protected onInit() {

  }

  protected onDestroy() {

  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(ev: MouseEvent): void {
    this.eventBusService.broadcast(this, EventBusMessages.ObjectChanged, 111111);
  }


}
