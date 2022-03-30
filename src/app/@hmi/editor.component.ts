import { Component, ComponentRef, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { Console } from 'console';

import { BasicCommand } from './commands/basic.command';

import { BasicComponent } from './components/basic-component/basic.component';
import { DisignerCanvasComponent } from './components/disigner-canvas/disigner.canvas.component';
import { HistoryService } from './core/history.service';
import { SelectionService } from './core/selection.service';
import { AdsorbService } from './core/adsorb.service';
import { ComponentSchemaService } from './services/component.schema.service';

@Component({
  selector: 'ngx-hmi-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent extends GenericComponent {

  /**
   * 默认坐标吸附阈值
   * 仅吸附该范围内坐标点
   */
  public readonly DEFAULT_ADSORB_THRESHOLD: number = 7;

  @ViewChild('canvas', { static: true }) canvas: DisignerCanvasComponent;

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
  constructor(protected injector: Injector, public provider: ComponentSchemaService) {
    super(injector);
    this._history = new HistoryService(this);
    this._selection = new SelectionService();
    this._adsorbService = new AdsorbService(this);
  }




  protected onInit(): void {
    this.canvas.editor = this;
    for (let i = 0; i < 50; i++) {
      const defaultConfigure = {
        id: `id:${i}`,
        name: `name:${i}`,
        type: (i % 2 == 0) ? 'SvgViewer' : 'ImgViewer',
        rect: {
          left: Math.floor(Math.random() * 2560),
          top: Math.floor(Math.random() * 1280),
          width: 200, // Math.floor(Math.random() * 100 + 100),
          height: 80 // Math.floor(Math.random() * 50 + 50),
        },
        style: { opacity: 0.8, ignoreEvent: true, border: 'solid 1px yellow' },
        data: {}
      };
      const compRef = this.canvas.parseComponent(defaultConfigure);
      this.canvas.add(compRef);
    }
    this.canvas.updatezIndexs();

  }

  public execute(cmd: BasicCommand): void {
    this.history.execute(cmd);
    this.selection.update();
  }

  public undo(): void {
    this.history.undo();
    this.selection.update();
  }

  public redo(): void {
    this.history.redo();
    this.selection.update();
  }



}
