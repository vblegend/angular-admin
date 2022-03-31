import { Component, HostBinding, Injector } from '@angular/core';
import { EventBusMessage } from '@hmi/core/common';
import { AnyObject } from '@core/common/types';
import { GenericComponent } from '@core/components/basic/generic.component';
import { EventBusService } from '@hmi/services/event.bus.service';
import { Widget } from '@hmi/core/common';
import { WidgetConfigure, WidgetDataConfigure } from '../../configuration/widget.configure';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-basic-comp',
  template: '<div></div>',
  styles: []
})
export class BasicWidgetComponent extends GenericComponent {
  private _config: WidgetConfigure;

  public get defineEvent(): Widget {
    return this.constructor.prototype.DEFINE_EVENT;
  }

  public get left(): number {
    return this.configure.rect.left;
  }

  public get top(): number {
    return this.configure.rect.top;
  }

  public get width(): number {
    return this.configure.rect.width;
  }

  public get height(): number {
    return this.configure.rect.height;
  }

  public get right(): number {
    return this.configure.rect.left + this.configure.rect.width;
  }

  public get bottom(): number {
    return this.configure.rect.top + this.configure.rect.height;
  }

  public get centerX(): number {
    return this.configure.rect.left + this.configure.rect.width / 2;
  }

  public get centerY(): number {
    return this.configure.rect.top + this.configure.rect.height / 2;
  }


  /**
   * host的绑定数据，不可修改。
   */
  @HostBinding('style.position')
  public readonly CONST_DEFAULT_HOST_POSITION_VALUE: string = 'absolute';

  /**
   * host的绑定数据，不可修改。
   */
  @HostBinding('style.overflow')
  public readonly CONST_DEFAULT_HOST_OVERFLOW_VALUE: string = 'hidden';

  /**
   * get component left px
   * binding host position
   */
  @HostBinding('style.left')
  public get left$(): string {
    return `${this.configure.rect.left}px`;
  }

  /**
   * get component top px
   * binding host position
   */
  @HostBinding('style.top')
  public get top$(): string {
    return `${this.configure.rect.top}px`;
  }

  /**
   * get component width px
   * binding host position
   */
  @HostBinding('style.width')
  public get width$(): string {
    return `${this.configure.rect.width}px`;
  }

  /**
   * get component height px
   * binding host position
   */
  @HostBinding('style.height')
  public get height$(): string {
    return `${this.configure.rect.height}px`;
  }

  /**
   * get component background
   * binding host position
   */
  @HostBinding('style.background')
  public get background(): string {
    return this.configure.style.background;
  }

  /**
   * get component opacity
   * binding host position
   */
  @HostBinding('style.opacity')
  public get opacity(): number {
    return this.configure.style.opacity;
  }

  /**
   * get component zIndex
   * binding host position
   */
  @HostBinding('style.zIndex')
  public get zIndex(): number {
    return this.configure.zIndex;
  }

  /**
   * get component zIndex
   * binding host position
   */
  @HostBinding('style.border')
  public get border(): string {
    return this.configure.style.border;
  }


  /**
   * get component configure profile
   */
  public get configure(): WidgetConfigure {
    return this._config;
  }


  /**
   * get component bind data
   */
  public get data(): WidgetDataConfigure {
    return this._config.data;
  }

  protected readonly eventBusService: EventBusService;

  constructor(injector: Injector) {
    super(injector)
    this.eventBusService = injector.get(EventBusService);
    /* 订阅事件总线 */
    const obser = this.eventBusService.filter(e => e.target != this).subscribe(this.eventHandle.bind(this));
    this.managedSubscription(obser);
  }


  protected eventHandle(message: EventBusMessage<any>) {
    console.log(message);
  }




  /**
   * 内部函数，禁止重载该方法
   * 保证变量data不可修改
   * @param _data 
   */
  public $initialization(_config: WidgetConfigure): void {
    if (this._config) throw 'This method is only available on first run ';
    this._config = _config;

    // console.log(this.defineEvent);
  }




  /**
   * 布局更新
   */
  protected onLayoutChanged() {

  }

  /**
   * 绑定数据更新
   * @param data 
   */
  protected onDataChanged(data: WidgetDataConfigure) {

  }



  /**
   * 组件异常事件
   * 通常发生在onInit 与 onDestroy中
   * @param ex 
   */
  protected onError(location: string, ex: AnyObject) {


    console.error(`异常出现在 => ${location}：${ex}`);
  }



}
