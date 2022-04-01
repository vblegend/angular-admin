import { Component, HostBinding, Injector } from '@angular/core';
import { AnyObject } from '@core/common/types';
import { GenericComponent } from '@core/components/basic/generic.component';
import { EventBusService } from '@hmi/services/event.bus.service';
import { WidgetConfigure, WidgetDataConfigure } from '../../configuration/widget.configure';
import { WidgetMetaObject } from '@hmi/core/widget.meta.data';
import { MessageTypes, EventMessage, EventMessageData } from '@hmi/core/common';

@Component({
  selector: 'app-basic-comp',
  template: '<div></div>',
  styles: []
})
export class BasicWidgetComponent extends GenericComponent {
  private _config: WidgetConfigure;


  public get metaData(): WidgetMetaObject {
    if (this.constructor.prototype.METADATA == null) {
      this.constructor.prototype.METADATA = new WidgetMetaObject();
    }
    return this.constructor.prototype.METADATA;
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
    const eventObser = this.eventBusService.filter(this.eventFilter.bind(this)).subscribe(this.eventHandle.bind(this));
    this.managedSubscription(eventObser);
  }


  private eventFilter(e: EventMessage): boolean {
    // 事件类型必须是事件
    if (e.type != MessageTypes.Event) return false;
    // 接收者为空 或 自己就是接收者
    if (e.receiver && e.receiver != this.configure.id) return false;
    // 发给自己的条件 接收者必须是自己
    if (e.sender == this && e.receiver != this.configure.id) return false;
    return true;
  }


  /**
   * 事件处理（并入 部件事件总线服务）
   * @param message 
   * @returns 
   */
  private eventHandle(message: EventMessage) {
    if (message.type === MessageTypes.Event) {
      const methodName = message.data.method as string;
      const params = message.data.params;
      const method = this.metaData.interface[methodName];
      if (method) {
        const args: AnyObject = [];
        for (let i = 0; i < method.args.length; i++) {
          const arg = method.args[i];
          const value = params[arg.argName];
          if (method.strict && value === undefined) {
            // 严格模式，跳出
            return;
          }
          args[i] = value;
        }
        const methodFunc = this[methodName];
        if (methodFunc) {
          methodFunc.apply(this, args);
        }
      }
    }
  }





  /**
   * 派遣一个指定事件到事件总线
   * @param type 事件类型
   * @param target 目标对象
   * @param data 数据
   */
  protected dispatch(type: MessageTypes, target?: string, data?: EventMessageData) {
    this.eventBusService.dispatch({
      sender: this,
      receiver: target,
      type: type,
      data: data
    });
  }



  /**
   * 派遣一个事件
   * 使用此功能需要在class对象使用@WidgetEvent 注解
   * @param eventName 事件名称，必须是使用在{@WidgetEvent}列表内的
   * @param params 事件的参数
   */
  protected dispatchEvent<T>(eventName: string, params: T) {
    const event = this.metaData.events[eventName];
    if (event == null) {
      throw `错误：事件派遣失败，部件“${this.constructor.name}”下未找到事件“${eventName}”的声明。`;
    }
    for (const key of event.eventParams) {
      if (params[key] === undefined) {
        throw `错误：事件派遣失败，部件“${this.constructor.name}”下,事件“${eventName}”缺少参数“${key}”。`;
      }
    }
    if (this.configure.events == null) return;
    const eventCfg = this.configure.events[eventName];
    if (eventCfg == null || eventCfg.length === 0) return;
    for (const cfg of eventCfg) {
      this.dispatch(MessageTypes.Event, cfg.target, {
        method: cfg.method,
        params: Object.assign({}, params, cfg.params)
      });
    }
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
