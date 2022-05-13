import { Component, HostListener, Injector } from '@angular/core';

import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { WidgetDataConfigure } from '@hmi/configuration/widget.configure';
import { CommonWidgetPropertys, DefaultData, DefaultEvents, DefaultInterval, DefaultSize, DefaultStyle, DefaultValue, DefineEvents, DefineProperties, Params, WidgetInterface } from '@hmi/core/common';

@Component({
  selector: 'app-submit-button-widget',
  templateUrl: './submit.button.widget.component.html',
  styleUrls: ['./submit.button.widget.component.less']
})
@DefineEvents([
  { event: 'click', eventName: '单击事件', eventParams: ['deviceId', 'stationId'] }
])
@DefineProperties([...CommonWidgetPropertys, 'Signal.Id'])
// 默认数据
@DefaultSize(86, 32)
@DefaultStyle({})
@DefaultInterval(2)
@DefaultEvents({})
@DefaultData({})
export class SubmitButtonWidgetComponent extends BasicWidgetComponent {

  public text: string = 'Search';
  public demoValue: number = 3;
  public isDisabled: boolean = false;

  public toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }

  constructor(injector: Injector) {
    super(injector)
  }

  protected onWidgetInit(data: WidgetDataConfigure): void {

  }


  protected onDestroy(): void {

  }


  public btn_onClick(): void {
    this.dispatchEvent('click', { deviceId: 9999999, stationId: 1000000 });
  }



  @WidgetInterface('更新按钮文本', '刷新部件数据')
  public updateButtonText(@Params('text') text?: string): void {
    this.text = text!;
  }




}
