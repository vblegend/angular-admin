import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
import { Rectangle } from '@hmi/core/common';


@Component({
  selector: 'ngx-selection-rectangle',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.less']
})
export class SelectionComponent extends GenericComponent {
  public rect: Rectangle;

  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.rect = { left: 0, top: 0, width: 0, height: 0 };
  }


  public getStyle(): Record<string, Object> {
    const style: Record<string, Object> = {};
    if (this.rect.left != null) style['left'] = `${this.rect.left}px`
    if (this.rect.top != null) style['top'] = `${this.rect.top}px`
    if (this.rect.width != null) style['width'] = `${this.rect.width}px`
    if (this.rect.height != null) style['height'] = `${this.rect.height}px`
    return style;
  }



  public isShow(): boolean {
    return this.rect.width > 0 && this.rect.height > 0;
  }



}