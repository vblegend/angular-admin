import { Component, HostListener, Injector } from '@angular/core';
import { TimerTask } from '@core/common/timer.task';
import { CaptureTime, CaptureTimeAsync } from '@core/decorators/capturetime';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { DefaultData, Params, DefineEvents, WidgetInterface, DefaultValue, DefineProperties, CommonWidgetPropertys, DefaultStyle, DefaultInterval, DefaultSize, DefaultEvents } from '@hmi/core/common';
import { ImageWidgetDataModel } from './data.model';

@Component({
  selector: 'app-img-widget',
  templateUrl: './img.widget.component.html',
  styleUrls: ['./img.widget.component.less']
})
// 定义事件
@DefineEvents([
  { event: 'click', eventName: '单击事件', eventParams: ['deviceId'] },
  { event: 'mouseEnter', eventName: '鼠标移入', eventParams: ['deviceId'] },
  { event: 'mouseLeave', eventName: '鼠标移出', eventParams: ['deviceId'] },
])
@DefineProperties([...CommonWidgetPropertys, 'Image.Url'])
// 默认数据
@DefaultSize(64, 128)
@DefaultStyle({})
@DefaultInterval(1)
@DefaultEvents({})
@DefaultData<ImageWidgetDataModel>({ imgSrc: './assets/images/test.png' })


export class ImgWidgetComponent extends BasicWidgetComponent {

  public src: string;


  constructor(injector: Injector) {
    super(injector)
    this.src = './assets/imgs/test.png';
  }

  protected onWidgetInit(data: ImageWidgetDataModel) {
    this.src = data.imgSrc!;
    console.log(this.queryParams);
    // throw new Error('ss');
  }

  protected onQueryChanges(): void {
    console.log(this.queryParams);
  }

  protected onDataChanged(attributePath: string[], value: any) {
    console.log(`reload [${attributePath}] => ${value}`);
  }


  protected onDestroy() {

  }

  @CaptureTimeAsync()
  protected async onDefaultTimer(task: TimerTask): Promise<void> {
    // 模拟数据加载延迟
    await this.sleep(5000);
  }

  @WidgetInterface('更换图片', '使用URL更换图片内容', true)
  public updateImage(@Params('url') url?: string) {
    console.log(`触发事件 updateImage => url:${url}`);
    this.src = url!;
  }

  @HostListener('mousedown@outside', ['$event'])
  public onMouseDown(ev: MouseEvent): void {
    this.dispatchEvent('click', { deviceId: 0 });
  }

  /**
   * 鼠标移入事件
   * @param ev 
   */
  @HostListener('mouseenter@outside', ['$event'])
  public onMouseEnter(ev: MouseEvent): void {
    this.dispatchEvent('mouseEnter', { deviceId: 0 });
  }

  /**
   * 鼠标移出事件
   * @param ev 
   */
  @HostListener('mouseleave@outside', ['$event'])
  public onMouseLeave(ev: MouseEvent): void {
    this.dispatchEvent('mouseLeave', { deviceId: 0 });
  }

}
