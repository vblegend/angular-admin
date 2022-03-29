import { Component, ElementRef, HostListener, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { PlayCanvasComponent } from '@hmi/components/play-canvas/play.canvas.component';

@Component({
  selector: 'ngx-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.less']
})
export class ExamplesComponent extends GenericComponent {
  @ViewChild('canvas', { static: true }) canvas: PlayCanvasComponent;

  public autoScale: boolean;


  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);

    this.autoScale = true;
  }


  protected onInit(): void {
    for (let i = 0; i < 50; i++) {
      const defaultConfigure = {
        id: `id:${i}`,
        name: `name:${i}`,
        type: (i % 2 == 0) ? 'SvgViewer' : 'ImgViewer',
        rect: {
          left: Math.floor(Math.random() * 3000),
          top: Math.floor(Math.random() * 2000),
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



  public getStyle(): Record<string, string> {
    const result: Record<string, string> = {};

    if (this.autoScale) {
      const element = this.viewContainerRef.element.nativeElement as HTMLDivElement;
      const parentRect = element.getBoundingClientRect();
      const rect = this.canvas.getComponentsBound();
      const rx = parentRect.width / rect.width;
      const ry = parentRect.height / rect.height;
      const zoomScale = Math.min(rx, ry);
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
