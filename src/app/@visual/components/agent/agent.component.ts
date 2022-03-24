import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { LoginPageComponent } from '@core/components/login/loginpage.component';
import { ComponentViewConfigure } from '../../configuration/component.element.configure';
import { CanvasComponent } from '../canvas/canvas.component';
import { SvgViewerComponent } from 'app/pages/graphics/svg.viewer/svg.viewer.component';
import { BasicComponent } from '../basic/basic.component';

@Component({
  selector: 'ngx-agent-element',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.less']
})
export class AgentComponent extends GenericComponent {
  @ViewChild('ChildrenView', { static: true, read: ViewContainerRef }) container: ViewContainerRef;
  public config: ComponentViewConfigure;
  private _canvas: CanvasComponent;


  /**
   * 获取当前代理对象所属canvas
   */
  public get canvas(): CanvasComponent {
    return this._canvas;
  }


  /**
   * 初始化对象的布局
   */
  public initLayout(canvas: CanvasComponent, configure: ComponentViewConfigure) {
    this.config = configure;
    this._canvas = canvas;
  }


  protected onInit(): void {
    this.ifDisposeThrowException();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SvgViewerComponent);
    const componentRef = this.container.createComponent<SvgViewerComponent>(componentFactory, null, this.injector);
    if (componentRef.instance instanceof BasicComponent) {
      componentRef.instance.data = this.config.data;
    } else {
      throw 'load fail. ';
    }

  }




  public getStyle(): Record<string, Object> {
    const style: Record<string, Object> = {};
    if (this.config.location.left != null) style['left'] = `${this.config.location.left}px`
    if (this.config.location.right != null && style['left'] != null) style['right'] = `${this.config.location.right}px`
    if (this.config.location.top != null) style['top'] = `${this.config.location.top}px`
    if (this.config.location.bottom != null && style['top'] != null) style['bottom'] = `${this.config.location.bottom}px`
    if (this.config.size.width != null) style['width'] = `${this.config.size.width}px`
    if (this.config.size.height != null) style['height'] = `${this.config.size.height}px`
    // =======================================================================================
    if (this.config.style.opacity != null) style['opacity'] = this.config.style.opacity;
    if (this.config.style.background != null) style['background'] = this.config.style.background;
    if (this.config.style.zIndex != null) style['zIndex'] = this.config.style.zIndex;
    return style;
  }




  public getConponentStyle(): Record<string, Object> {
    const style: Record<string, Object> = {};
    style['user-select'] = 'none';
    if (this.config.style.ignoreEvent) style['pointer-events'] = 'none';
    return style;
  }





}