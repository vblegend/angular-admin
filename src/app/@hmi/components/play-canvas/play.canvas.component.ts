import { ChangeDetectionStrategy, Component, ComponentRef, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { ComponentConfigure } from '../../configuration/component.element.configure';
import { ComponentSchemaService } from '@hmi/services/component.schema.service';
import { BasicComponent } from '../basic-component/basic.component';

@Component({
  selector: 'ngx-play-canvas',
  templateUrl: './play.canvas.component.html',
  styleUrls: ['./play.canvas.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayCanvasComponent extends GenericComponent {
  @ViewChild('ChildrenView', { static: true, read: ViewContainerRef }) container: ViewContainerRef;

  private _children: ComponentRef<BasicComponent>[];


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


  public remove(ref: ComponentRef<BasicComponent>): ComponentRef<BasicComponent> {
    const ofIndex = this._children.indexOf(ref);
    if (ofIndex > -1) {
      this._children.splice(ofIndex, 1);
      const v = this.container.indexOf(ref.hostView);
      this.container.detach(v);
    }
    return ref;
  }

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

  public clear() {
    while (this._children.length > 0) {
      const compRef = this._children[0];
      this.remove(compRef);
      compRef.destroy();
    }
  }


  public parseComponent(configure: ComponentConfigure): ComponentRef<BasicComponent> {

    const comRef = this.provider.getType(configure.type);
    if (comRef == null) {
      throw `未知的类型${configure.type}.`;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<BasicComponent>(comRef.component);
    const componentRef = this.container.createComponent<BasicComponent>(componentFactory, null, this.injector);
    if (componentRef.instance instanceof BasicComponent) {
      componentRef.instance.$initialization(configure);
    } else {
      throw 'load fail. ';
    }


    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AgentComponent);
    // const componentRef = this.container.createComponent<AgentComponent>(componentFactory, null, this.injector);
    // componentRef.instance.selfRef = componentRef;
    // componentRef.instance.initLayout(this, configure);
    // this.remove(componentRef);
    return componentRef;
  }

  protected onInit(): void {

  }


  protected onDestroy(): void {
    super.onDestroy();
    this.clear();
  }


}
