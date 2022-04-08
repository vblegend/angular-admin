import { Component, HostBinding, Injector } from '@angular/core';
import { AnyObject } from '@core/common/types';
import { GenericComponent } from '@core/components/basic/generic.component';
import { EventBusService } from '@core/services/event.bus.service';
import { WidgetConfigure, WidgetDataConfigure, WidgetDefaultConfigure } from '../../configuration/widget.configure';
import { WidgetMetaObject } from '@hmi/core/widget.meta.data';
import { WidgetEventService } from '@hmi/services/widget.event.service';
import { ObjectUtil } from '@core/util/object.util';

@Component({
  selector: 'app-basic-comp',
  template: '<div></div>',
  styles: []
})
/**
 * 小部件基类，实现了小部件的一些基础服务
 */
export abstract class BasicWidgetComponent extends GenericComponent {
  private _config: WidgetConfigure;

  /**
   * 小部件内部事件处理服务\
   * 由canvas进行隔离\
   */
  private readonly eventService: WidgetEventService;
  /**
   * 小部件的元数据\
   * 
   */
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


  public get groupId(): number {
    return this.configure.group;
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



  constructor(injector: Injector) {
    super(injector)
    this.eventService = injector.get(WidgetEventService);
  }


  /**
   * 派遣一个事件
   * 使用此功能需要在class对象使用@WidgetEvent 注解
   * @param event 要触发的事件，必须是使用在{@WidgetEvent}列表内的
   * @param params 事件的参数
   */
  protected dispatchEvent<T>(event: string, params: T) {
    const _eventMeta = this.metaData.events[event];
    if (_eventMeta == null) {
      throw `错误：事件派遣失败，部件“${this.constructor.name}”下未找到事件“${event}”的声明。`;
    }
    for (const key of _eventMeta.eventParams) {
      if (params[key] === undefined) {
        throw `错误：事件派遣失败，部件“${this.constructor.name}”下,事件“${event}”缺少参数“${key}”。`;
      }
    }
    if (this.configure.events == null) return;
    const eventCfg = this.configure.events[event];
    if (eventCfg == null || eventCfg.length === 0) return;
    for (const cfg of eventCfg) {
      this.eventService.dispatch(this, cfg.target, cfg.method, Object.assign({}, params, cfg.params));
    }
  }

  /**
   * 内部函数，禁止重载该方法
   * 保证变量data不可修改
   * @param _data 
   */
  public $initialization(_config: WidgetConfigure, _default: WidgetDefaultConfigure): void {
    if (this._config) throw 'This method is only available on first run ';
    this._config = ObjectUtil.clone(_config);
    // 升级数据属性
    ObjectUtil.upgrade(this._config.data, _default.data);
    // 升级样式属性
    ObjectUtil.upgrade(this._config.style, _default.style);
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
