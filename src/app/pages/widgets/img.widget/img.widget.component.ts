import { Component, HostListener, Injector } from '@angular/core';

import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { MessageTypes, Params, WidgetEvent, WidgetInterface } from '@hmi/core/common';

@Component({
  selector: 'app-img-widget',
  templateUrl: './img.widget.component.html',
  styleUrls: ['./img.widget.component.less']
})
@WidgetEvent([
  { event: 'click', eventName: '单击事件', eventParams: ['widgetId'] },
  { event: 'mouseEnter', eventName: '鼠标移入', eventParams: ['widgetId'] },
  { event: 'mouseLeave', eventName: '鼠标移出', eventParams: ['widgetId'] },
])
export class ImgWidgetComponent extends BasicWidgetComponent {

  constructor(injector: Injector) {
    super(injector)

  }


  protected onInit() {
    
  }

  protected onDestroy() {

  }


  @WidgetInterface('刷新数据', '刷新部件数据', true)
  public updateImg(@Params('deviceId') deviceId?: number,
    @Params('standardId') standardId?: number,
    @Params('corePointId') corePointId?: number) {
    console.log(`触发事件 updateImg => deviceId:${deviceId}，standardId:${standardId}，corePointId:${corePointId}`);
  }




  @HostListener('mousedown', ['$event'])
  public onMouseDown(ev: MouseEvent): void {
    this.dispatchEvent('click', {});
  }


}
