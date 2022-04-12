import { Component, Injector, Input } from '@angular/core';
import { BasicPropertyComponent } from '@hmi/editor/components/basic-property/basic.property.component';
@Component({
  selector: 'hmi-number-property',
  templateUrl: './number.property.component.html',
  styleUrls: ['./number.property.component.less'],
})
/**
 * 字符串属性绑定
 */
export class NumberPropertyComponent extends BasicPropertyComponent<number> {

  @Input()
  public max: number = Number.MAX_VALUE;

  @Input()
  public min: number = Number.MIN_VALUE;

  @Input()
  public step: number = 1;

  @Input()
  public unit: string = '';

  @Input()
  public precision: number = 2;


  public formatter: (value: number) => string;
  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);
    this.formatter = this.formatterFunc.bind(this);
    this.nullValue = 0;
  }

  private formatterFunc(value: number): string {
    return (this.unit && this.unit.length) ? `${value} ${this.unit}` : `${value}`;
  }
}
