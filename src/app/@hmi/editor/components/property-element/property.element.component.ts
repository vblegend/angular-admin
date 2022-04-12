import { Component, ContentChild, ContentChildren, ElementRef, Injector, Input, QueryList } from '@angular/core';
import { AnyObject } from '@core/common/types';
import { GenericComponent } from '@core/components/basic/generic.component';
import { BasicPropertyComponent } from '@hmi/editor/components/basic-property/basic.property.component';
import { HmiEditorComponent } from '@hmi/hmi.editor.component';
@Component({
  selector: 'hmi-property-element',
  templateUrl: './property.element.component.html',
  styleUrls: ['./property.element.component.less'],
})
/**
 * 字符串属性绑定
 */
export class PropertyElementComponent extends GenericComponent {
  
  @Input()
  public title: string = '标题';

  @Input()
  public tooltip: string = '标题';

  @Input()
  public editor!: HmiEditorComponent;

  /**
   * 属性的路径\
   * 填写configure下的层级，层级之间用/分割\
   * 如：\
   * “name”\
   * “rect/left”\
   * “data/deviceId”
   */
  @Input()
  public attributePath: string = 'data';

  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);
  }

  protected onInit(): void {

  }

  public ngDisplayed(): boolean {
    if (this.editor.selection.length == 0) return false;
    return true;
  }


}
