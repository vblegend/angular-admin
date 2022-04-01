import { Component, HostListener, Injector } from '@angular/core';

import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { MessageTypes, Params, WidgetEvent, WidgetInterface } from '@hmi/core/common';

@Component({
  selector: 'app-submit-button-widget',
  templateUrl: './submit.button.widget.component.html',
  styleUrls: ['./submit.button.widget.component.less']
})
@WidgetEvent([
  { event: 'click', eventName: '单击事件', eventParams: ['deviceId', 'stationId'] },
  { event: 'mouseEnter', eventName: '鼠标移入', eventParams: [] },
  { event: 'mouseLeave', eventName: '鼠标移出', eventParams: [] },
])
export class SubmitButtonWidgetComponent extends BasicWidgetComponent {

  constructor(injector: Injector) {
    super(injector)
  }

  protected onDestroy() {

  }


  public btn_onClick(): void {
    this.dispatchEvent('click', { deviceId: 9999999, stationId: 1000000 });
  }


}
