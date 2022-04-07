import { Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';


@Component({
  selector: 'ngx-hmi-editor',
  styleUrls: ['./editor.component.less'],
  templateUrl: './editor.component.html',
})
export class EditorComponent extends GenericComponent {

  constructor(injector: Injector) {
    super(injector);

  }
}
