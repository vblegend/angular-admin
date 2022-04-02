import { ChangeDetectionStrategy, Component, ComponentRef, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { WidgetConfigure } from '../../configuration/widget.configure';
import { WidgetSchemaService } from '@hmi/services/widget.schema.service';
import { BasicWidgetComponent } from '../basic-widget/basic.widget.component';
import { HmiMath } from '@hmi/utility/hmi.math';
import { Rectangle } from '@hmi/core/common';
import { WidgetEventService } from '@hmi/services/widget.event.service';

@Component({
  selector: 'ngx-view-canvas',
  templateUrl: './view.canvas.component.html',
  styleUrls: ['./view.canvas.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: WidgetEventService }]
})
export class ViewCanvasComponent extends GenericComponent {
  @ViewChild('ChildrenView', { static: true, read: ViewContainerRef }) container: ViewContainerRef;
  private _children: ComponentRef<BasicWidgetComponent>[];
  private _eventHub: WidgetEventService;

  /**
   *
   */
  constructor(protected injector: Injector, public provider: WidgetSchemaService) {
    super(injector);
    this._children = [];
    this._eventHub = injector.get(WidgetEventService);
    this._eventHub.initCanvas$(this);
  }


  /**
   * 获取容器内所有组件列表
   */
  public get children(): ComponentRef<BasicWidgetComponent>[] {
    return this._children.slice();
  }


  /**
   * 更新容器的zIndex属性
   * 数值越大越往前
   */
  public updatezIndexs() {
    this._children.sort((a, b) => b.instance.zIndex - a.instance.zIndex);
  }


  /**
   * 添加一个组件至容器中
   * @param ref 
   * @param index 
   * @returns 
   */
  public add(ref: ComponentRef<BasicWidgetComponent>, index?: number): ComponentRef<BasicWidgetComponent> {
    const ofIndex = this._children.indexOf(ref);
    if (ofIndex === -1) {
      this.container.insert(ref.hostView, index);
      this._children.push(ref);
      if (ref.instance.zIndex == null) {
        ref.instance.configure.zIndex = this._children.length;
      }
    }
    return ref;
  }

  /**
   * 从容器中移除一个组件
   * @param ref 
   * @returns 
   */
  public remove(ref: ComponentRef<BasicWidgetComponent>): ComponentRef<BasicWidgetComponent> {
    const ofIndex = this._children.indexOf(ref);
    if (ofIndex > -1) {
      this._children.splice(ofIndex, 1);
      const v = this.container.indexOf(ref.hostView);
      this.container.detach(v);
    }
    return ref;
  }

  /**
   * 获取当前是否为编辑态
   */
  public get isEditor(): boolean {
    return false;
  }



  /**
   * 清理并销毁掉所有组件
   */
  public clear() {
    while (this._children.length > 0) {
      const compRef = this._children[0];
      this.remove(compRef);
      compRef.destroy();
    }
  }

  /**
   * 解析一个组件，返回组件对象。
   * 当解析到象失败时返回null
   * @param configure 
   * @returns 
   */
  public parseComponent(configure: WidgetConfigure): ComponentRef<BasicWidgetComponent> {
    let componentRef: ComponentRef<BasicWidgetComponent> = null;
    const comRef = this.provider.getType(configure.type);
    if (comRef) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory<BasicWidgetComponent>(comRef.component);
      componentRef = this.container.createComponent<BasicWidgetComponent>(componentFactory, null, this.injector);
      if (componentRef && componentRef.instance instanceof BasicWidgetComponent) {
        componentRef.hostView.detach();
        componentRef.instance.$initialization(configure);
      }
    }
    if (componentRef == null) this.onError('parseComponent', `未知的组态类型：${configure.type}.`);
    return componentRef;
  }

  protected onInit(): void {

  }


  protected onDestroy(): void {
    super.onDestroy();
    this.clear();
  }


  /**
   * 获取所有容器的总大小。
   * @returns 
   */
  public getComponentsBound(): Rectangle {
    let result: Rectangle = null;
    for (const comp of this.children) {
      if (result == null) {
        result = {
          left: comp.instance.configure.rect.left,
          top: comp.instance.configure.rect.top,
          width: comp.instance.configure.rect.width,
          height: comp.instance.configure.rect.height
        };
      } else {
        result = HmiMath.extendsRectangle(result, comp.instance.configure.rect);
      }
    }
    return result;
  }



}
