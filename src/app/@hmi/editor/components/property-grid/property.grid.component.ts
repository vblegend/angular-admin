import { ChangeDetectorRef, Component, ComponentRef, ElementRef, HostBinding, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { BasicCommand } from '@hmi/commands/basic.command';
import { SelectionFillCommand } from '@hmi/commands/selection.fill.command';
import { SelectionToggleCommand } from '@hmi/commands/selection.toggle.command';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { DisignerCanvasComponent } from '@hmi/components/disigner-canvas/disigner.canvas.component';

import { HmiEditorComponent } from '@hmi/hmi.editor.component';
import { WidgetSchemaService } from '@hmi/services/widget.schema.service';


@Component({
  selector: 'hmi-property-grid',
  templateUrl: './property.grid.component.html',
  styleUrls: ['./property.grid.component.less']
})
/**
 * 橡皮筋套选工具
 */
export class PropertyGridComponent extends GenericComponent {
  @Input() editor!: HmiEditorComponent;
  /**
   *
   */
  constructor(protected injector: Injector, protected provider: WidgetSchemaService) {
    super(injector);
  }

  protected onInit(): void {

  }




}