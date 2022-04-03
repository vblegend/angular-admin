import { Component, ComponentRef, ElementRef, Injector, Input, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { BasicCommand } from './commands/basic.command';
import { DisignerCanvasComponent } from './components/disigner-canvas/disigner.canvas.component';
import { HistoryService } from './core/history.service';
import { SelectionService } from './core/selection.service';
import { AdsorbService } from './core/adsorb.service';
import { WidgetSchemaService } from './services/widget.schema.service';
import { WidgetConfigure } from './configuration/widget.configure';
import { AnyObject } from '@core/common/types';
import { SplitComponent, SplitAreaDirective, IOutputData } from 'angular-split'
import { ObjectAttributeCommand } from './commands/object.attribute.command';

@Component({
  selector: 'ngx-hmi-editor',
  templateUrl: './hmi.editor.component.html',
  styleUrls: ['./hmi.editor.component.less']
})
export class HmiEditorComponent extends GenericComponent {

  /**
   * 默认坐标吸附阈值
   * 仅吸附该范围内坐标点
   */
  public readonly DEFAULT_ADSORB_THRESHOLD: number = 7;
  @ViewChildren(SplitAreaDirective) areasEl: QueryList<SplitAreaDirective>

  @ViewChild('canvas', { static: true }) canvas: DisignerCanvasComponent;


  public leftAreaVisible: boolean = true;
  public rightAreaVisible: boolean = true;


  private _history: HistoryService;
  private _selection: SelectionService;
  private _adsorbService: AdsorbService;


  /**
   * 坐标吸附服务
   */
  public get adsorb(): AdsorbService { return this._adsorbService; }

  /**
   * 撤销回退服务
   */
  public get history(): HistoryService { return this._history; }

  /**
   * 对象选择服务
   */
  public get selection(): SelectionService { return this._selection; }

  /**
   *
   */
  constructor(protected injector: Injector, public provider: WidgetSchemaService) {
    super(injector);
    this._history = new HistoryService(this);
    this._selection = new SelectionService();
    this._adsorbService = new AdsorbService(this);
  }



  public gutterDblClick(vv: IOutputData) {

    if (vv.gutterNum == 1) {
      // this.areasEl.first.minSize = 0;
      if (this.leftAreaVisible) {
        this.areasEl.first.collapse(0);
        // this.areasEl.first.visible = false;
        this.leftAreaVisible = false;
      } else {
        this.leftAreaVisible = true;
        this.areasEl.first.expand();
        // this.areasEl.first.visible = true;
      }
    }

    if (vv.gutterNum == 2) {
      // this.areasEl.last.minSize = 0;
      if (this.rightAreaVisible) {
        this.areasEl.last.collapse(0, 'left')
        // this.areasEl.last.visible = false;
        this.rightAreaVisible = false;
      } else {
        this.rightAreaVisible = true;
        this.areasEl.last.expand();
        // this.areasEl.last.visible = true;
      }
    }

  }

  protected onInit(): void {
    this.canvas.editor = this;
    for (let i = 0; i < 10; i++) {
      const randomWidget = Math.floor(Math.random() * (this.provider.length));
      const widgetType = this.provider.getIndex(randomWidget);
      const defaultConfigure: WidgetConfigure = {
        id: `id:${i}`,
        name: `name:${i}`,
        type: widgetType.type,
        rect: {
          left: Math.floor(Math.random() * 2560),
          top: Math.floor(Math.random() * 1280),
          width: widgetType.default.rect.width,
          height: widgetType.default.rect.height
        },
        // group: Math.floor(Math.random() * 3),
        style: widgetType.default.style,
        data: widgetType.default.data,
        events: widgetType.default.events
      };
      const compRef = this.canvas.parseComponent(defaultConfigure);
      if (compRef) this.canvas.add(compRef);
    }
    this.canvas.updatezIndexs();

  }

  /**
   * 执行一条命令
   * @param cmd 
   */
  public execute(cmd: BasicCommand): void {
    this.history.execute(cmd);
    this.selection.update();
  }

  /**
   * 撤销操作
   */
  public undo(): void {
    this.history.undo();
    this.selection.update();
  }

  /**
   * 重做操作
   */
  public redo(): void {
    this.history.redo();
    this.selection.update();
  }


  /**
   * 组合选中对象
   * @returns 
   */
  public groupingObjects(): void {
    const hasGroupObjects = this.canvas.children.filter(e => e.instance.groupId != null);
    const groupIds = hasGroupObjects.map(e => e.instance.groupId);
    groupIds.push(0);
    const maxGroupId = Math.max(...groupIds);
    this.execute(new ObjectAttributeCommand(this, this.selection.objects.map(e => e.instance), 'configure/group', [maxGroupId + 1]));
  }

  /**
   * 拆分选中对象
   * @returns 
   */
  public unGroupingObjects(): void {
    this.execute(new ObjectAttributeCommand(this, this.selection.objects.map(e => e.instance), 'configure/group', [null]));
  }


  /**
   * 锁定对象移动
   */
  public lockObjects(): void {
    this.execute(new ObjectAttributeCommand(this, this.selection.objects.map(e => e.instance), 'configure/locked', [true]));
  }


  /**
   * 解锁对象
   */
  public unlockObjects(): void {
    this.execute(new ObjectAttributeCommand(this, this.selection.objects.map(e => e.instance), 'configure/locked', [null]));
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

