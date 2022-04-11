import { Component, Injector, Input } from '@angular/core';
import { AnyObject } from '@core/common/types';
import { BasicPropertyComponent } from '@hmi/editor/components/basic-property/basic.property.component';
@Component({
  selector: 'hmi-slider-property',
  templateUrl: './slider.property.component.html',
  styleUrls: ['./slider.property.component.less'],
})
/**
 * 字符串属性绑定
 */
export class SliderPropertyComponent extends BasicPropertyComponent {

  @Input()
  public readonly max: number = Number.MAX_VALUE;

  @Input()
  public readonly min: number = Number.MIN_VALUE;

  @Input()
  public readonly step: number = 1;

  @Input()
  public readonly unit: string = '';


  /**
   * 当绑定的数据为null时 使用当前值
   */
  @Input()
  public readonly nullValue: number = 0;



  public formatter: (value: number) => string;
  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.formatter = this.formatterFunc.bind(this);
  }



  protected dataBinding_fix(value: AnyObject): AnyObject {
    return value != null ? value : this.nullValue;
  }



  private formatterFunc(value: number): string {
    return (this.unit && this.unit.length) ? `${value} ${this.unit}` : `${value}`;
  }
}
