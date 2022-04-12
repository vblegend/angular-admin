import { Component, Injector, Input } from '@angular/core';
import { nzSelectItem } from '@core/common/types';
import { BasicPropertyComponent } from '@hmi/editor/components/basic-property/basic.property.component';
@Component({
  selector: 'hmi-select-property',
  templateUrl: './select.property.component.html',
  styleUrls: ['./select.property.component.less'],
})
/**
 * 字符串属性绑定
 */
export class SelectPropertyComponent extends BasicPropertyComponent<string> {

  @Input()
  public options: nzSelectItem[] = [];

  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.nullValue = undefined;
  }

  protected onInit(): void {
    super.onInit();
  }

}
