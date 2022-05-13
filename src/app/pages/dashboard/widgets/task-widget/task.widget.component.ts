import { Component, HostListener, Injector } from '@angular/core';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { WidgetDataConfigure } from '@hmi/configuration/widget.configure';
import { DefaultData, Params, DefineEvents, WidgetInterface, DefaultValue, DefineProperties, CommonWidgetPropertys, DefaultStyle, DefaultInterval, DefaultSize, DefaultEvents } from '@hmi/core/common';

@Component({
  selector: 'app-task-widget',
  templateUrl: './task.widget.component.html',
  styleUrls: ['./task.widget.component.less']
})
@DefineProperties([...CommonWidgetPropertys, 'Device.Id', 'Signal.Id', 'Image.Url'])
@DefineEvents([])
// 默认数据
@DefaultSize(300, 150)
@DefaultStyle({})
@DefaultInterval(4)
@DefaultEvents({})
@DefaultData({})
export class TaskWidgetComponent extends BasicWidgetComponent {

  constructor(injector: Injector) {
    super(injector)
  }


  protected onWidgetInit(data: WidgetDataConfigure): void {

  }


  protected onDestroy(): void {

  }
  

  @HostListener('mousedown', ['$event'])
  public onMouseDown(ev: MouseEvent): void {
    this.dispatchEvent('click', { taskId: 123 });
  }


}
