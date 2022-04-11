import { Component, Injector, Input } from '@angular/core';
import { AnyObject, nzSelectItem } from '@core/common/types';
import { BasicPropertyComponent } from '@hmi/editor/components/basic-property/basic.property.component';
@Component({
  selector: 'hmi-select-property',
  templateUrl: './select.property.component.html',
  styleUrls: ['./select.property.component.less'],
})
/**
 * 字符串属性绑定
 */
export class SelectPropertyComponent extends BasicPropertyComponent {

  @Input()
  public readonly options: nzSelectItem[] = [];

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

  protected onInit(): void {
    super.onInit();
    console.log(this.options);
  }

  protected dataBinding_fix(value: AnyObject): AnyObject {
    return value != null ? value : this.nullValue;
  }
}
