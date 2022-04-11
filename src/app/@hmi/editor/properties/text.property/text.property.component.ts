import { Component, Injector } from '@angular/core';
import { BasicPropertyComponent } from '@hmi/editor/components/basic-property/basic.property.component';
@Component({
  selector: 'hmi-text-property',
  templateUrl: './text.property.component.html',
  styleUrls: ['./text.property.component.less'],
})
/**
 * 字符串属性绑定
 */
export class TextPropertyComponent extends BasicPropertyComponent {

  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);

  }


}
