import { Component, ComponentRef, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { AgentComponent } from '../agent/agent.component';
import { ComponentConfigure } from '../../configuration/component.element.configure';
import { EditorComponent } from '../../editor.component';
import { PlayCanvasComponent } from '../play-canvas/play.canvas.component';

@Component({
  selector: 'ngx-disigner-canvas',
  templateUrl: './disigner.canvas.component.html',
  styleUrls: ['./disigner.canvas.component.less']
})
export class DisignerCanvasComponent extends PlayCanvasComponent {
  @Input() editor: EditorComponent;
  @ViewChild('ChildrenView', { static: true, read: ViewContainerRef }) container: ViewContainerRef;

  /**
   * 设置/获取 视图的缩放倍率
   */
  public zoomScale: number;


  public get isEditor(): boolean {
    return true;
  }


  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.zoomScale = 1;
  }


}
