import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { LoginPageComponent } from '@core/components/login/loginpage.component';
import { ComponentConfigure, ElementLocation } from '../../configuration/component.element.configure';
import { PlayCanvasComponent } from '../play-canvas/play.canvas.component';
import { SvgViewerComponent } from 'app/pages/graphics/svg.viewer/svg.viewer.component';
import { BasicComponent } from '../basic/basic.component';
import { ImgViewerComponent } from 'app/pages/graphics/img.viewer/img.viewer.component';
import { EditorComponent } from 'app/@hmi/editor.component';
import { DisignerCanvasComponent } from '../disigner-canvas/disigner.canvas.component';

@Component({
  selector: 'ngx-agent-element',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.less']
})
export class AgentComponent extends GenericComponent {
  @ViewChild('ChildrenView', { static: true, read: ViewContainerRef }) container: ViewContainerRef;
  public config: ComponentConfigure;
  private _canvas: PlayCanvasComponent;
  private _editor: EditorComponent;
  public selfRef: ComponentRef<AgentComponent>;
  /**
   * 获取当前代理对象所属canvas
   */
  public get canvas(): PlayCanvasComponent {
    return this._canvas;
  }

  public get editor(): EditorComponent {
    return this._editor;
  }

  public get isSelected(): boolean {
    return true;
  }


  /**
   * 初始化对象的布局
   */
  public initLayout(canvas: PlayCanvasComponent, configure: ComponentConfigure) {
    this.config = configure;
    this._canvas = canvas;
    if (canvas instanceof DisignerCanvasComponent) {
      this._editor = canvas.editor;
    }
  }


  protected onInit(): void {
    this.ifDisposeThrowException();
    console.log(this.config.type);
    const comRef = this.editor.provider.getType(this.config.type);
    if (comRef == null) {
      throw `未知的类型${this.config.type}.`;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<BasicComponent>(comRef.component);
    const componentRef = this.container.createComponent<BasicComponent>(componentFactory, null, this.injector);
    if (componentRef.instance instanceof BasicComponent) {
      componentRef.instance.initialization(this.config.data);
    } else {
      throw 'load fail. ';
    }

  }




  public getStyle(): Record<string, Object> {
    const style: Record<string, Object> = {};
    if (this.config.rect.left != null) style['left'] = `${this.config.rect.left}px`
    if (this.config.rect.top != null) style['top'] = `${this.config.rect.top}px`
    if (this.config.rect.width != null) style['width'] = `${this.config.rect.width}px`
    if (this.config.rect.height != null) style['height'] = `${this.config.rect.height}px`
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




  public isShowDecorator() {
    return this.canvas.isEditor && this.isSelected;
  }


  protected onDestroy(): void {
      this.selfRef = null;
  }



}