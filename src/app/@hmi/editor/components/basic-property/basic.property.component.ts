import { Component, ComponentRef, HostBinding, Injector, Input, QueryList, ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AnyObject } from '@core/common/types';
import { GenericComponent } from '@core/components/basic/generic.component';
import { Sealed } from '@core/decorators/sealed';
import { GenericAttributeCommand } from '@hmi/commands/generic.attribute.command';
import { BasicWidgetComponent } from '@hmi/components/basic-widget/basic.widget.component';
import { WidgetConfigure } from '@hmi/configuration/widget.configure';
import { HmiEditorComponent } from '@hmi/hmi.editor.component';
@Component({
  selector: 'app-basic-comp',
  template: '<div></div>',
  styles: []
})

/**
 * 
 */
export abstract class BasicPropertyComponent extends GenericComponent {
  @Input()
  public readonly editor: HmiEditorComponent;


  /**
   * 属性的路径\
   * 填写configure下的层级，层级之间用/分割\
   * 如：\
   * “name”\
   * “rect/left”\
   * “data/deviceId”
   */
  @Input()
  public readonly attributePath: string = 'data';

  /**
   *
   */
  constructor(protected injector: Injector) {
    super(injector);
  }

  /**
   * 
   */
  @ViewChildren(NgModel)
  protected modelDirectives?: QueryList<NgModel> = new QueryList();

  @Sealed()
  protected onAfterViewInit(): void {
    for (let i = 0; i < this.modelDirectives.length; i++) {
      const ngModel = this.modelDirectives.get(i);
      const subscription = ngModel.update.subscribe(e => { this.modelChanges(e); });
      this.managedSubscription(subscription);
    }
  }

  private modelChanges(value: AnyObject): void {
    this.saveAndUpdate(value);
  }



  /**
   * 保存变更并更新
   */
  public saveAndUpdate(value: AnyObject): void {
    console.log('数据被变更:' + this.attributePath);

    const obejcts = this.editor.selection.objects.map(e => e.instance.configure);
    const command = new GenericAttributeCommand(this.editor, obejcts, this.attributePath, [value],);
    this.editor.execute(command);
    this.detectChanges();
  }

  public get objects(): ComponentRef<BasicWidgetComponent>[] {
    return this.editor.selection.objects;
  }

  public get object(): ComponentRef<BasicWidgetComponent> {
    return this.editor.selection.objects[0];
  }

  public get configure(): WidgetConfigure {
    if (this.editor.selection.objects && this.editor.selection.objects.length > 0) {
      return this.editor.selection.objects[0].instance.configure;
    }
    return <any>{};
  }

  public get defaultProperty(): AnyObject {
    return this.configure[this.attributePath];
  }
  public set defaultProperty(value: AnyObject) {
    console.log('log=>');
  }

}

