import { Component, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';

import { BasicCommand } from './commands/basic.command';
import { HistoryManager } from './core/HistoryManager';
import { ComponentSchemaService } from './services/component.schema.service';

@Component({
  selector: 'ngx-configuration-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent extends GenericComponent {
  private _history: HistoryManager;
  public get history(): HistoryManager { return this._history; }











  /**
   *
   */
  constructor(protected injector: Injector, public provider: ComponentSchemaService) {
    super(injector);
    this._history = new HistoryManager(this);
  }




  public execute(cmd: BasicCommand): void {
    this.history.execute(cmd);
  }


}