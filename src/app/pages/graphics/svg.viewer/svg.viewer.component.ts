import { Component, Injector } from '@angular/core';
import { BasicComponent } from '@hmi/components/basic-component/basic.component';

@Component({
  selector: 'app-svg-viewer',
  templateUrl: './svg.viewer.component.html',
  styleUrls: ['./svg.viewer.component.less']
})
export class SvgViewerComponent extends BasicComponent {

  constructor(injector: Injector) {
    super(injector)
  }

  protected onInit() {

  }

  protected onDestroy() {

  }



}
