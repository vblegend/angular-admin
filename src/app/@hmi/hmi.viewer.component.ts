import { Component, Injector, ViewChild } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { WidgetSchemaService } from './services/widget.schema.service';
import { ViewCanvasComponent } from './components/view-canvas/view.canvas.component';
import { WidgetConfigure } from './configuration/widget.configure';

@Component({
  selector: 'hmi-viewer',
  templateUrl: './hmi.viewer.component.html',
  styleUrls: ['./hmi.viewer.component.less']
})
export class HmiViewerComponent extends GenericComponent {

  @ViewChild('canvas', { static: true })
  public canvas!: ViewCanvasComponent;

  public autoScale: boolean;

  /**
   *
   */
  constructor(protected injector: Injector, public provider: WidgetSchemaService) {
    super(injector);
    this.autoScale = true;
  }


  protected onInit(): void {
    for (let i = 0; i < 10; i++) {
      const widgetType = this.provider.random()!;
      const defaultConfigure: WidgetConfigure = {
        id: `id:${i}`,
        name: `name:${i}`,
        type: widgetType!.type!,
        rect: {
          left: Math.floor(Math.random() * 2560),
          top: Math.floor(Math.random() * 1280),
          width: widgetType.default.rect!.width,
          height: widgetType.default.rect!.height
        },
        style: widgetType.default.style,
        data: widgetType.default.data,
        events: widgetType.default.events
      };
      const compRef = this.canvas.parseComponent(defaultConfigure);
      if (compRef) this.canvas.add(compRef);

    }
    this.canvas.updatezIndexs();

  }




  public getStyle(): Record<string, string> {
    const result: Record<string, string> = {};

    if (this.autoScale) {
      const element = this.viewContainerRef.element.nativeElement as HTMLDivElement;
      const parentRect = element.getBoundingClientRect();
      const rect = this.canvas.getComponentsBound();
      const rx = parentRect.width / rect!.width;
      const ry = parentRect.height / rect!.height;
      const zoomScale = Math.min(rx, ry) - 0.001;
      if (zoomScale != 1) {
        result['transform'] = 'scale(' + zoomScale + ')';
      }
    }
    return result;
  }

  public getScrollViewerStyle(): Record<string, string> {
    const result: Record<string, string> = {};
    result['overflow'] = this.autoScale ? 'inherit' : 'auto';
    return result;
  }


}
