import { Component, ComponentRef, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { AgentComponent } from '../agent/agent.component';
import { ComponentConfigure } from '../../configuration/component.element.configure';
import { EditorComponent } from '../../editor.component';

@Component({
  selector: 'ngx-disigner-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.less']
})
export class CanvasComponent extends GenericComponent {
  @ViewChild('ChildrenView', { static: true, read: ViewContainerRef }) container: ViewContainerRef;
  @Input() editor: EditorComponent;
  /**
   * 设置/获取 视图的缩放倍率
   */
  public zoomScale: number;

  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.zoomScale = 1;
  }

  public clear() {
    this.container.clear();
    this.container.createComponent
  }

  public createAgentComponent(configure: ComponentConfigure): ComponentRef<AgentComponent> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AgentComponent);
    const componentRef = this.container.createComponent<AgentComponent>(componentFactory, null, this.injector);
    componentRef.instance.initLayout(this, configure);
    this.remove(componentRef);
    return componentRef;//componentFactory.create(this.injector);
  }

  public add(ref: ComponentRef<AgentComponent>): ComponentRef<AgentComponent> {
    this.container.insert(ref.hostView);
    return ref;
  }

  public remove(ref: ComponentRef<AgentComponent>): ComponentRef<AgentComponent> {
    const v = this.container.indexOf(ref.hostView);
    this.container.detach(v);
    return ref;
  }






  protected onInit(): void {
    this.ifDisposeThrowException();


    const obj = this.createAgentComponent({
      id: '001',
      name: '测试一号',
      type: 'SvgViewer',
      location: { left: 500, top: 200 },
      size: { width: 300, height: 150, },
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
      location: { left: 200, top: 200, },
      size: { width: 100, height: 50 },
      style: { opacity: 0.8, ignoreEvent: true },
      data: {}
    });

    const componentRef3 = this.container.createComponent<AgentComponent>(componentFactory, null, this.injector);
    componentRef3.instance.initLayout(this, {
      id: '001',
      name: '测试一号',
      type: 'SvgViewer',
      location: { left: 2500, top: 1200 },
      size: { width: 50, height: 5 },
      style: { opacity: 0.8, ignoreEvent: true },
      data: {}
    });



  }



}
