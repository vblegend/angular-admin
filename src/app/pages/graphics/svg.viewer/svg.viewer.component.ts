import { Component, Injector } from '@angular/core';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';

@Component({
  selector: 'app-svg-viewer',
  templateUrl: './svg.viewer.component.html',
  styleUrls: ['./svg.viewer.component.less']
})
export class SvgViewerComponent extends BasicWidgetComponent {

  constructor(injector: Injector) {
    super(injector)
  }

  protected onInit() {

  }

  protected onDestroy() {

  }



}
