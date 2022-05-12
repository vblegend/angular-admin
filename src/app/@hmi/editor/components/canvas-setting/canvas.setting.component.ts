import { ChangeDetectorRef, Component, ComponentRef, ElementRef, HostBinding, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { BasicCommand } from '@hmi/editor/commands/basic.command';
import { SelectionFillCommand } from '@hmi/editor/commands/selection.fill.command';
import { SelectionToggleCommand } from '@hmi/editor/commands/selection.toggle.command';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { DisignerCanvasComponent } from '@hmi/components/disigner-canvas/disigner.canvas.component';

import { HmiEditorComponent } from '@hmi/editor/hmi.editor.component';
import { WidgetSchemaService } from '@hmi/services/widget.schema.service';
import { GenericDrawerComponent } from '@core/components/basic/generic.drawer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'hmi-canvas-setting',
  templateUrl: './canvas.setting.component.html',
  styleUrls: ['./canvas.setting.component.less']
})
/**
 * 组态设置
 */
export class CanvasSettingComponent extends GenericDrawerComponent<string, boolean> {
  @Input()
  public canvas!: DisignerCanvasComponent;

  constructor(injector: Injector) {
    super(injector);
  }




  public onInit(): void {

  }


  public submit(): void {
    this.close(false);
  }

  public cancel(): void {
    this.close(false);
  }


  public onDestroy(): void {

  }


}