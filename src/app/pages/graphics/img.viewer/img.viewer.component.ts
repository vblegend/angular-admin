import { Component, HostListener, Injector } from '@angular/core';
import { BasicComponent } from '@hmi/components/basic-component/basic.component';
import { ComponentDataConfigure } from '@hmi/configuration/component.element.configure';

@Component({
  selector: 'app-img-viewer',
  templateUrl: './img.viewer.component.html',
  styleUrls: ['./img.viewer.component.less']
})
export class ImgViewerComponent extends BasicComponent {

  constructor(injector: Injector) {
    super(injector)
  }



  protected onInit() {

  }

  protected onDestroy() {

  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(ev: MouseEvent): void {
    console.log('img.click');
  }


}
