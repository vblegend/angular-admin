import { Component, ComponentRef, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { AgentComponent } from '../agent/agent.component';
import { ComponentConfigure } from '../../configuration/component.element.configure';
import { EditorComponent } from '../../editor.component';

@Component({
  selector: 'ngx-play-canvas',
  templateUrl: './play.canvas.component.html',
  styleUrls: ['./play.canvas.component.less']
})
export class PlayCanvasComponent extends GenericComponent {
  @ViewChild('ChildrenView', { static: true, read: ViewContainerRef }) container: ViewContainerRef;

  private _children: ComponentRef<AgentComponent>[];


  public get children(): ComponentRef<AgentComponent>[] {
    return this._children.slice();
  }



  public add(ref: ComponentRef<AgentComponent>, index?: number): ComponentRef<AgentComponent> {
    const ofIndex = this._children.indexOf(ref);
    if (ofIndex === -1) {
      this.container.insert(ref.hostView, index);
      this._children.push(ref);
    }
    return ref;
  }


  public remove(ref: ComponentRef<AgentComponent>): ComponentRef<AgentComponent> {
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
  constructor(protected injector: Injector) {
    super(injector);
    this._children = [];
  }

  public clear() {
    this.container.clear();
  }


  public parseComponent(configure: ComponentConfigure): ComponentRef<AgentComponent> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AgentComponent);
    const componentRef = this.container.createComponent<AgentComponent>(componentFactory, null, this.injector);
    componentRef.instance.selfRef = componentRef;
    componentRef.instance.initLayout(this, configure);
    this.remove(componentRef);
    return componentRef;
  }






  protected onInit(): void {
    this.ifDisposeThrowException();
    const obj = this.parseComponent({
      id: '001',
      name: '测试一号',
      type: 'SvgViewer',
      rect: { left: 500, top: 200, width: 300, height: 150, },
      style: { opacity: 0.8, ignoreEvent: true },
      data: {}
    })
    this.add(obj);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AgentComponent);
    const componentRef2 = this.container.createComponent<AgentComponent>(componentFactory, null, this.injector);
    componentRef2.instance.initLayout(this, {
      id: '002',
      name: '测试一号',
      type: 'ImgViewer',
      rect: { left: 200, top: 200, width: 100, height: 50 },
      style: { opacity: 0.8, ignoreEvent: true },
      data: {}
    });

    const componentRef3 = this.container.createComponent<AgentComponent>(componentFactory, null, this.injector);
    componentRef3.instance.initLayout(this, {
      id: '001',
      name: '测试一号',
      type: 'SvgViewer',
      rect: { left: 2500, top: 1200, width: 50, height: 5 },
      style: { opacity: 0.8, ignoreEvent: true },
      data: {}
    });



  }



}
