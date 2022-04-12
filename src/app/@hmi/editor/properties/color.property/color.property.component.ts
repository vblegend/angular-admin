import { Component, Injector, Input } from '@angular/core';
import { AnyObject, nzSelectItem } from '@core/common/types';
import { BasicPropertyComponent } from '@hmi/editor/components/basic-property/basic.property.component';
@Component({
  selector: 'hmi-color-property',
  templateUrl: './color.property.component.html',
  styleUrls: ['./color.property.component.less'],
})
/**
 * 字符串属性绑定
 */
export class ColorPropertyComponent extends BasicPropertyComponent<string> {

  /**
    * 当绑定的数据为null时 使用当前值
    */
  @Input()
  public nullValue: string | undefined = 'transparent';

  /**
   * 默认颜色表
   */
  @Input()
  public defaultColors: string[] = [];


  constructor(protected injector: Injector) {
    super(injector);
    this.nullValue = 'transparent';
    this.defaultColors = ['transparent', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
  }

  /**
   * 预制默认颜色点击应用
   * @param value 
   */
  public colorClick(value: string) {
    this.saveAndUpdate(value);
  }


}
