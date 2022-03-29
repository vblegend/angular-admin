import { ChangeDetectionStrategy, Component, ComponentRef, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { ComponentConfigure } from '../../configuration/component.element.configure';
import { ComponentSchemaService } from '@hmi/services/component.schema.service';
import { BasicComponent } from '../basic-component/basic.component';
import { HmiMath } from '@hmi/utility/hmi.math';
import { Rectangle } from '@hmi/core/common';

@Component({
  selector: 'ngx-play-canvas',
  templateUrl: './play.canvas.component.html',
  styleUrls: ['./play.canvas.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayCanvasComponent extends GenericComponent {
  @ViewChild('ChildrenView', { static: true, read: ViewContainerRef }) container: ViewContainerRef;

  private _children: ComponentRef<BasicComponent>[];

  /**
   * 获取容器内所有组件列表
   */
  public get children(): ComponentRef<BasicComponent>[] {
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
  public add(ref: ComponentRef<BasicComponent>, index?: number): ComponentRef<BasicComponent> {
    const ofIndex = this._children.indexOf(ref);
    if (ofIndex === -1) {
      this.container.insert(ref.hostView, index);
      this._children.push(ref);
      if (ref.instance.zIndex == null) {
        ref.instance.configure.style.zIndex = this._children.length;
      }
    }
    return ref;
  }

  /**
   * 从容器中移除一个组件
   * @param ref 
   * @returns 
   */
  public remove(ref: ComponentRef<BasicComponent>): ComponentRef<BasicComponent> {
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
   *
   */
  constructor(protected injector: Injector, public provider: ComponentSchemaService) {
    super(injector);
    this._children = [];
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
   * @param configure 
   * @returns 
   */
  public parseComponent(configure: ComponentConfigure): ComponentRef<BasicComponent> {
    const comRef = this.provider.getType(configure.type);
    if (comRef == null) {
      throw `未知的类型${configure.type}.`;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<BasicComponent>(comRef.component);
    const componentRef = this.container.createComponent<BasicComponent>(componentFactory, null, this.injector);
    if (componentRef && componentRef.instance instanceof BasicComponent) {
      componentRef.hostView.detach();
      componentRef.instance.$initialization(configure);
    } else {
      throw 'load fail. ';
    }
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
