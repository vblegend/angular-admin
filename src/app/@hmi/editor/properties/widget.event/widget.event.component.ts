import { ChangeDetectionStrategy, Component, ComponentRef, DoCheck, Injector, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectItem } from '@core/common/types';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { EventMeta } from '@hmi/core/widget.meta.data';
import { BasicPropertyComponent } from '@hmi/editor/components/basic-property/basic.property.component';
import { WidgetSchemaService } from '@hmi/services/widget.schema.service';






@Component({
  selector: 'hmi-widget-event',
  templateUrl: './widget.event.component.html',
  styleUrls: ['./widget.event.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * 橡皮筋套选工具
 */
export class WidgetEventComponent extends BasicPropertyComponent implements OnChanges {
  /**
   *
   */
  constructor(protected injector: Injector, protected provider: WidgetSchemaService) {
    super(injector);
    this.selectedEvent = 'click';
  }

  public selectedEvent: string;

  public get targetList(): SelectItem[] {
    const result: SelectItem[] = [{ label: "广播", value: null }];
    for (const widget of this.editor.canvas.children) {
      result.push({
        label: widget.instance.configure.name,
        value: widget.instance.configure.id
      })
    }
    return result;
  }

  public getTargetInterfaces(id: string): SelectItem[] {
    const result = [];
    const widgets: ComponentRef<BasicWidgetComponent>[] = [];
    if (id) {
      const widget = this.editor.canvas.findWidgetById(id);
      if (widget) widgets.push(widget);

    } else {
      widgets.push(...this.editor.canvas.children);
    }


    for (const widget of widgets) {
      for (var key in widget.instance.metaData.interface) {
        const method = widget.instance.metaData.interface[key];
        result.push({
          label: `${method.name}[${widget.instance.configure.name}]`,
          value: method.methodName
        })
      }
    }

    return result;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // this.parentComponent.title = 'angular next!';
    console.log(changes);
  }
  // public ngDoCheck(): void {
  //   // this.parentComponent.title = 'angular next!';
  //   console.log('child-----DoCheck');
  // }

  public dataChanged(ev){
    console.log(ev);
  }




  public trackByKey(index: number, value: string) {
    return value;
  }

  public trackByEvent(index: number, value: EventMeta) {
    return value.event;
  }

  public get eventList(): SelectItem[] {
    const result = [];
    for (const key in this.object.instance.metaData.events) {
      result.push({
        label: this.object.instance.metaData.events[key].eventName,
        value: this.object.instance.metaData.events[key].event
      })
    }
    return result;
  }


  protected onInit(): void {


  }


  public getAddButtonState(): boolean {
    return this.selectedEvent == null || this.object == null || this.object.instance.configure.events[this.selectedEvent] != null;
  }



  public eventKeys(): string[] {
    return Object.keys(this.object.instance.configure.events);
  }

  public eventName(key: string): string {
    return this.object.instance.metaData.events[key].eventName;
  }




  public addEvent(event: string): void {
    console.log(event);
    if (this.configure.events[event] == null) {
      this.configure.events[event] = [{ method: null, target: null, params: {} }];
    }
  }


}