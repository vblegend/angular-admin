import { Component, ComponentRef, HostBinding, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { ComponentConfigure } from '../../configuration/component.element.configure';
import { PlayCanvasComponent } from '../play-canvas/play.canvas.component';
import { EditorComponent } from 'app/@hmi/editor.component';
import { ComponentSchemaService } from '@hmi/services/component.schema.service';
import { Rectangle } from '@hmi/core/common';
import { DisignerCanvasComponent } from '../disigner-canvas/disigner.canvas.component';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'ngx-selection-area',
  templateUrl: './selection.area.component.html',
  styleUrls: ['./selection.area.component.less']
})
export class SelectionAreaComponent extends GenericComponent {
  @ViewChild('ChildrenView', { static: true, read: ViewContainerRef }) container: ViewContainerRef;
  private _canvas: DisignerCanvasComponent;
  private _editor: EditorComponent;


  /**
   * 获取当前代理对象所属canvas
   */
  public get canvas(): DisignerCanvasComponent {
    return this._canvas;
  }

  public get editor(): EditorComponent {
    return this._editor;
  }

  /**
   *
   */
  constructor(protected injector: Injector, public provider: ComponentSchemaService) {
    super(injector);
  }


  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.contextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.contextMenuService.close();
  }



  public init(_canvas: DisignerCanvasComponent) {
    this._canvas = _canvas;
    this._editor = _canvas.editor;
  }


  protected onInit(): void {
  }


  protected onDestroy(): void {
  }



  /**
   * host的绑定数据，不可修改。
   */
  @HostBinding('style.position')
  public readonly CONST_DEFAULT_HOST_POSITION_VALUE: string = 'absolute';


  /**
   * get component left px
   * binding host position
   */
  @HostBinding('style.left')
  public get left(): string {
    return `${this._editor.selection.bounds.left}px`;
  }

  /**
   * get component top px
   * binding host position
   */
  @HostBinding('style.top')
  public get top(): string {
    return `${this._editor.selection.bounds.top}px`;
  }

  /**
   * get component width px
   * binding host position
   */
  @HostBinding('style.width')
  public get width(): string {
    return `${this._editor.selection.bounds.width}px`;
  }

  /**
   * get component height px
   * binding host position
   */
  @HostBinding('style.height')
  public get height(): string {
    return `${this._editor.selection.bounds.height}px`;
  }

  /**
   * get/set zIndex
   * 当按下ctrl时，当前组件置于最底端，。
   */
  @HostBinding('style.zIndex')
  public get zIndex(): number {
    return (this.canvas && this.canvas.ctrlPressed) ? SelectionAreaComponent.MIN_ZINDEX : SelectionAreaComponent.MAX_ZINDEX;
  }

  /**
   * 用于控制框选组件是否可见
   */
  @HostBinding('style.display')
  public get display(): string {
    return this._editor.selection.bounds.height > 0 && this._editor.selection.bounds.width > 0 ? '' : 'none';
  }


  public static readonly MAX_ZINDEX: number = 999999;
  public static readonly MIN_ZINDEX: number = -999999;

}