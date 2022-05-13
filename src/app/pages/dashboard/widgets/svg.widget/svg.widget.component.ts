import { Component, HostListener, Injector } from '@angular/core';
import { TimerTask } from '@core/common/timer.task';
import { CaptureTime, CaptureTimeAsync } from '@core/decorators/capturetime';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { WidgetDataConfigure } from '@hmi/configuration/widget.configure';
import { DefaultData, Params, DefineEvents, WidgetInterface, DefaultValue, DefineProperties, CommonWidgetPropertys, DefaultStyle, DefaultInterval, DefaultSize, DefaultEvents } from '@hmi/core/common';

@Component({
  selector: 'app-svg-widget',
  templateUrl: './svg.widget.component.html',
  styleUrls: ['./svg.widget.component.less']
})
@DefineProperties([...CommonWidgetPropertys, 'Device.Id'])

@DefineEvents([])
// 默认数据
@DefaultSize(250, 100)
@DefaultStyle({})
@DefaultInterval(3)
@DefaultEvents({})
@DefaultData({})
export class SvgWidgetComponent extends BasicWidgetComponent {

  constructor(injector: Injector) {
    super(injector)
  }

  protected onWidgetInit(data: WidgetDataConfigure): void {

  }

  protected onDestroy(): void {

  }

  @WidgetInterface('更新信号', '刷新部件数据')
  public updateSvg(@Params('stationId') stationId?: number, @Params('roomId') roomId?: number, @Params('deviceId') deviceId?: number): void {
    // console.log(`触发事件 updateSvg => stationId:${stationId}，roomId:${roomId}，deviceId:${deviceId}`);
  }

  @CaptureTimeAsync()
  protected async onDefaultTimer(task: TimerTask): Promise<void> {

  }

  @HostListener('mousedown@outside', ['$event'])
  public onMouseDown(ev: MouseEvent): void {
    this.dispatchEvent('click', {});
  }


}
