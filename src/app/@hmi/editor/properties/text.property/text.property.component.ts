import { Component, Injector, Input } from '@angular/core';
import { AnyObject } from '@core/common/types';
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
   * 当绑定的数据为null时 使用当前值
   */
  @Input()
  public readonly nullValue: string = '';
  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);

  }

  protected dataBinding_fix(value: AnyObject): AnyObject {
    return value != null ? value : this.nullValue;
  }
}
