import { Component, HostListener, Injector } from '@angular/core';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { WidgetEvent } from '@hmi/core/common';

@Component({
  selector: 'app-task-widget',
  templateUrl: './task.widget.component.html',
  styleUrls: ['./task.widget.component.less']
})
@WidgetEvent([
  { event: 'click', eventName: '单击事件', eventParams: ['taskId'] },
  { event: 'mouseEnter', eventName: '鼠标移入', eventParams: ['taskId'] },
  { event: 'mouseLeave', eventName: '鼠标移出', eventParams: ['taskId'] },
])
export class TaskWidgetComponent extends BasicWidgetComponent {

  constructor(injector: Injector) {
    super(injector)
  }


  protected onInit() {


  }

  protected onDestroy() {

  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(ev: MouseEvent): void {
    this.dispatchEvent('click', {});
  }


}
