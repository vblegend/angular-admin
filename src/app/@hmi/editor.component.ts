import { Component, ComponentRef, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';

import { BasicCommand } from './commands/basic.command';
import { AgentComponent } from './components/agent/agent.component';
import { DisignerCanvasComponent } from './components/disigner-canvas/disigner.canvas.component';
import { HistoryManager } from './core/history.manager';
import { ComponentSchemaService } from './services/component.schema.service';

@Component({
  selector: 'ngx-hmi-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent extends GenericComponent {

  @ViewChild('canvas', { static: true }) canvas: DisignerCanvasComponent;

  private _history: HistoryManager;

  public get history(): HistoryManager { return this._history; }

  /**
   *
   */
  constructor(protected injector: Injector, public provider: ComponentSchemaService) {
    super(injector);
    this._history = new HistoryManager(this);
  }




  protected onInit(): void {
    console.log(this.canvas);
  }

  public execute(cmd: BasicCommand): void {
    this.history.execute(cmd);
  }

  public addComponent(component: AgentComponent, index?: number): void {
    this.canvas.container.insert(component.selfRef.hostView, index);
  }

  public removeComponent(component: AgentComponent): void {
    this.canvas.remove(component.selfRef);
    const v = this.canvas.container.indexOf(component.selfRef.hostView);
    if (v >= 0) {
      this.canvas.container.detach(v);
    }
  }

  public undo(): void {
    this.history.undo();
  }

  public redo(): void {
    this.history.redo();
  }



}
