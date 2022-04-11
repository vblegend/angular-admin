import { Component, Injector, Input } from '@angular/core';
import { AnyObject } from '@core/common/types';
import { BasicPropertyComponent } from '@hmi/editor/components/basic-property/basic.property.component';
@Component({
  selector: 'hmi-property-element',
  templateUrl: './property.element.component.html',
  styleUrls: ['./property.element.component.less'],
})
/**
 * 字符串属性绑定
 */
export class PropertyElementComponent extends BasicPropertyComponent {

  @Input()
  public readonly title: string = '标题';

  @Input()
  public readonly tooltip: string = '标题';


  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);

  }

  protected onInit(): void {
 
  }


}
