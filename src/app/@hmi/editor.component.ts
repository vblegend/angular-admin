import { Component, ComponentRef, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';

import { BasicCommand } from './commands/basic.command';

import { BasicComponent } from './components/basic-component/basic.component';
import { DisignerCanvasComponent } from './components/disigner-canvas/disigner.canvas.component';
import { HistoryManager } from './core/history.manager';
import { SelectionService } from './core/selection.service';
import { ComponentSchemaService } from './services/component.schema.service';

@Component({
  selector: 'ngx-hmi-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent extends GenericComponent {

  @ViewChild('canvas', { static: true }) canvas: DisignerCanvasComponent;

  private _history: HistoryManager;
  private _selection: SelectionService;
  public get history(): HistoryManager { return this._history; }
  public get selection(): SelectionService { return this._selection; }

  /**
   *
   */
  constructor(protected injector: Injector, public provider: ComponentSchemaService) {
    super(injector);
    this._history = new HistoryManager(this);
    this._selection = new SelectionService();
  }




  protected onInit(): void {
    this.canvas.editor = this;

    for (let i = 0; i < 1000; i++) {




      const defaultConfigure = {
        id: `id:${i}`,
        name: `name:${i}`,
        type: (i % 2 == 0) ? 'SvgViewer' : 'ImgViewer',
        rect: {
          left: Math.floor(Math.random() * 1920),
          top: Math.floor(Math.random() * 1080),
          width: Math.floor(Math.random() * 100 + 10),
          height: Math.floor(Math.random() * 50 + 5),
        },
        style: { opacity: 0.8, ignoreEvent: true ,border: 'solid 1px yellow' },
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

  public addComponent(component: BasicComponent, index?: number): void {
    this.canvas.container.insert(component.selfRef.hostView, index);
  }

  public removeComponent(component: BasicComponent): void {
    this.canvas.remove(component.selfRef);
    const v = this.canvas.container.indexOf(component.selfRef.hostView);
    if (v >= 0) {
      this.canvas.container.detach(v);
    }
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
