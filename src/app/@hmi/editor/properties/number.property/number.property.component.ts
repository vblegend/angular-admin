import { Component, Injector, Input } from '@angular/core';
import { AnyObject } from '@core/common/types';
import { BasicPropertyComponent } from '@hmi/editor/components/basic-property/basic.property.component';
@Component({
  selector: 'hmi-number-property',
  templateUrl: './number.property.component.html',
  styleUrls: ['./number.property.component.less'],
})
/**
 * 字符串属性绑定
 */
export class NumberPropertyComponent extends BasicPropertyComponent {

  @Input()
  public readonly max: number = Number.MAX_VALUE;

  @Input()
  public readonly min: number = Number.MIN_VALUE;

  @Input()
  public readonly step: number = 1;

  @Input()
  public readonly unit: string = '';

  @Input()
  public readonly precision: number = 2;


  public formatter: (value: number) => string;
  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.formatter = this.formatterFunc.bind(this);
  }







  private formatterFunc(value: number): string {
    return (this.unit && this.unit.length) ? `${value} ${this.unit}` : `${value}`;
  }
}
