import { Component, Injector } from '@angular/core';
import { BasicComponent } from 'app/@hmi/components/basic/basic.component';

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



}
