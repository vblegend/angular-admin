import { Component, HostListener, Injector } from '@angular/core';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { Params, WidgetEvent, WidgetInterface } from '@hmi/core/common';

@Component({
  selector: 'app-svg-widget',
  templateUrl: './svg.widget.component.html',
  styleUrls: ['./svg.widget.component.less']
})
@WidgetEvent([
  { event: 'click', eventName: '单击事件', eventParams: ['widgetId'] },
  { event: 'mouseEnter', eventName: '鼠标移入', eventParams: ['widgetId'] },
  { event: 'mouseLeave', eventName: '鼠标移出', eventParams: ['widgetId'] },
])
export class SvgWidgetComponent extends BasicWidgetComponent {

  constructor(injector: Injector) {
    super(injector)
  }

  protected onInit() {

  }

  protected onDestroy() {

  }

  @WidgetInterface('刷新数据', '刷新部件数据')
  public updateSvg(@Params('stationId') stationId?: number,
    @Params('roomId') roomId?: number,
    @Params('deviceId') deviceId?: number) {
    // console.log(`触发事件 updateSvg => stationId:${stationId}，roomId:${roomId}，deviceId:${deviceId}`);
  }



  @HostListener('mousedown@outside', ['$event'])
  public onMouseDown(ev: MouseEvent): void {
    this.dispatchEvent('click', {});
  }


}
