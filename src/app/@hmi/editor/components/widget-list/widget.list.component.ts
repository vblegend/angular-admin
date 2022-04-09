import { ChangeDetectorRef, Component, ComponentRef, ElementRef, HostBinding, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { ObjectUtil } from '@core/util/object.util';
import { BasicCommand } from '@hmi/commands/basic.command';
import { WidgetAddCommand } from '@hmi/commands/widget.add.command';
import { SelectionFillCommand } from '@hmi/commands/selection.fill.command';
import { SelectionToggleCommand } from '@hmi/commands/selection.toggle.command';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { DisignerCanvasComponent } from '@hmi/components/disigner-canvas/disigner.canvas.component';
import { WidgetConfigure } from '@hmi/configuration/widget.configure';
import { WidgetSchema } from '@hmi/configuration/widget.schema';

import { HmiEditorComponent } from '@hmi/hmi.editor.component';
import { WidgetSchemaService } from '@hmi/services/widget.schema.service';
import { HmiMath } from '@hmi/utility/hmi.math';


@Component({
  selector: 'hmi-widget-list',
  templateUrl: './widget.list.component.html',
  styleUrls: ['./widget.list.component.less']
})
/**
 * 橡皮筋套选工具
 */
export class WidgetListComponent extends GenericComponent {
  @Input() canvas: DisignerCanvasComponent;
  @Input() editor: HmiEditorComponent;

  // @ViewChild('dragImage', { static: true }) dragImage: ElementRef<HTMLImageElement>;
  /**
   *
   */
  constructor(protected injector: Injector, public provider: WidgetSchemaService) {
    super(injector);
  }

  protected onInit(): void {

  }






  public widget_dragstart(schema: WidgetSchema, event: DragEvent) {
    event.dataTransfer.setDragImage(new Image(), 0, 0);
    event.dataTransfer.setData('json/widget', JSON.stringify(schema));
    // 设置所有widget不接受鼠标事件
    this.canvas.children.map(e => {
      const element = e.location.nativeElement as HTMLElement;
      element.style.pointerEvents = 'none';
    });
  }


  public widget_dragend(schema: WidgetSchema, event: DragEvent) {
    // 设置所有widget接受鼠标事件
    this.canvas.children.map(e => {
      const element = e.location.nativeElement as HTMLElement;
      element.style.pointerEvents = '';
    });
  }

  private generateName(baseName: string): string {
    let i = 1;
    while (true) {
      const name = baseName + i.toString();
      if (this.canvas.findWidgetByName(name) == null) return name;
      i++;
    }
  }

  private generateId(): string {
    while (true) {
      const id = HmiMath.randomString(6);
      if (this.canvas.findWidgetById(id) == null) return id;
    }
  }



  public widget_dblClick(schema: WidgetSchema, event: DragEvent) {
    const configure: WidgetConfigure = {
      id: this.generateId(),
      name: this.generateName(schema.name),
      type: schema.type,
      zIndex: this.editor.canvas.children.length,
      style: ObjectUtil.clone(schema.default.style),
      data: ObjectUtil.clone(schema.default.data),
      rect: ObjectUtil.clone(schema.default.rect),
      events: {}
    };


    configure.rect.left = Math.floor(this.canvas.scrollViewer.nativeElement.scrollLeft / this.canvas.zoomScale);
    configure.rect.top = Math.floor(this.canvas.scrollViewer.nativeElement.scrollTop / this.canvas.zoomScale);
    const compRef = this.canvas.parseComponent(configure);
    if (compRef) {
      this.editor.execute(new WidgetAddCommand(this.editor, [compRef], true));
    }
  }






}