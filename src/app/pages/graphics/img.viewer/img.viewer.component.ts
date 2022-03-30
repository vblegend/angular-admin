import { Component, HostListener, Injector } from '@angular/core';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { ComponentDataConfigure } from '@hmi/configuration/component.element.configure';
import { AnyObject } from 'chart.js/types/basic';

@Component({
  selector: 'app-img-viewer',
  templateUrl: './img.viewer.component.html',
  styleUrls: ['./img.viewer.component.less']
})
export class ImgViewerComponent extends BasicWidgetComponent {

  constructor(injector: Injector) {
    super(injector)
  }


  protected onInit() {
    throw '芭比Q了';
  }

  protected onDestroy() {

  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(ev: MouseEvent): void {
    console.log('img.click');
  }


}
