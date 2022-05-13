import { ChangeDetectorRef, Component, ComponentRef, ElementRef, HostBinding, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { BasicCommand } from '@hmi/editor/commands/basic.command';
import { SelectionFillCommand } from '@hmi/editor/commands/selection.fill.command';
import { SelectionToggleCommand } from '@hmi/editor/commands/selection.toggle.command';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { DisignerCanvasComponent } from '@hmi/components/disigner-canvas/disigner.canvas.component';

import { HmiEditorComponent } from '@hmi/editor/hmi.editor.component';
import { WidgetSchemaService } from '@hmi/services/widget.schema.service';


@Component({
  selector: 'hmi-object-list',
  templateUrl: './object.list.component.html',
  styleUrls: ['./object.list.component.less']
})
/**
 * 橡皮筋套选工具
 */
export class ObjectListComponent extends GenericComponent {
  @Input()
  public canvas!: DisignerCanvasComponent;
  /**
   *
   */
  constructor(protected injector: Injector, protected provider: WidgetSchemaService, public editor: HmiEditorComponent) {
    super(injector);
  }



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getItemStyle(widget: ComponentRef<BasicWidgetComponent>): Record<string, any> {
    const isSelected = this.editor.selection.contains(widget);
    return {
      'background-color': isSelected ? '#007acc' : ''
    };
  }


  public widget_click(event: MouseEvent, widget: ComponentRef<BasicWidgetComponent>) :void{
    let command: BasicCommand | null = null;
    const selecteds: ComponentRef<BasicWidgetComponent>[] = [widget];
    // 分组过滤选中
    const groupId = widget.instance.configure.group;
    if (groupId) {
      const result = this.editor.canvas.children.filter(e => e.instance.groupId === groupId);
      if (result.length > 0) selecteds.push(...result);
    }
    if (event.ctrlKey) {
      command = new SelectionToggleCommand(this.editor, selecteds);
    } else if (event.shiftKey) {
      //
    } else {
      command = new SelectionFillCommand(this.editor, selecteds);
    }
    this.editor.execute(command);
    this.canvas.selectionArea.detectChanges();
  }


  public getIcon(widget: ComponentRef<BasicWidgetComponent>): string {
    const schema = this.provider.getType(widget.instance.configure.type);
    if (schema) return schema.icon;
    return 'grace-bushu';
  }



}