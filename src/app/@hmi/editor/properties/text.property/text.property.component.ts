import { Component, Injector, Input } from '@angular/core';
import { BasicPropertyComponent } from '@hmi/editor/components/basic-property/basic.property.component';
@Component({
  selector: 'hmi-text-property',
  templateUrl: './text.property.component.html',
  styleUrls: ['./text.property.component.less'],
})
/**
 * 字符串属性绑定
 */
export class TextPropertyComponent extends BasicPropertyComponent<string> {
  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.nullValue = '';
  }


}
