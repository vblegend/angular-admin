import { Component, HostListener, Injector } from '@angular/core';
import { EventBusMessages } from '@hmi/core/common';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { Widget } from '@hmi/core/common';

@Component({
  selector: 'app-task-widget',
  templateUrl: './task.widget.component.html',
  styleUrls: ['./task.widget.component.less']
})
@Widget({

  events: [
    {}
  ]

})
export class TaskWidgetComponent extends BasicWidgetComponent {

  constructor(injector: Injector) {
    super(injector)
  }


  protected onInit() {

    // this.eventBusService.subscribe(e => {
    //   console.log(e.data);
    // });


    throw '芭比Q了';

  }

  protected onDestroy() {

  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(ev: MouseEvent): void {
    this.eventBusService.broadcast(this, EventBusMessages.ObjectChanged, 333333);
  }


}
