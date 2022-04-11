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

  private _attributePath: string = 'data';
  private _attrPaths: string[] = [];

  /**
   * 属性的路径\
   * 填写configure下的层级，层级之间用/分割\
   * 如：\
   * “name”\
   * “rect/left”\
   * “data/deviceId”
   */
  @Input()
  // public readonly attributePath: string = 'data';
  public set attributePath(value: string) {
    this._attributePath = value;
    this._attrPaths = value.split('/');
  }

  public get attributePath(): string {
    return this._attributePath;
  }


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
      const subscription = ngModel.update.subscribe(e => { this.saveAndUpdate(e); });
      this.managedSubscription(subscription);
    }
  }


  /**
   * 数据修改修复扩展\
   * 此事件发生在用户输入完成后，且在数据命令创建之前。
   * @param value 用户实际输入的数值
   * @returns 返回被修复的数值
   */
  protected dataModify_fix(value: AnyObject): AnyObject {
    return value;
  }


  /**
   * 数据绑定修复扩展\
   * 此事件发生在组件绑定模型数据之前\
   * @param value 绑定模型的实际数据
   * @returns 组件中显示的数据
   */
  protected dataBinding_fix(value: AnyObject): AnyObject {
    return value;
  }

  /**
   * 保存变更并更新
   */
  public saveAndUpdate(value: AnyObject): void {
    const fixValue = this.dataModify_fix(value);
    console.log(`数据被变更 ${this.attributePath} => ${value}`);
    const obejcts = this.editor.selection.objects.map(e => e.instance.configure);
    const command = new GenericAttributeCommand(this.editor, obejcts, this.attributePath, [fixValue],);
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
    let value = this.configure;
    for (let i = 0; i < this._attrPaths.length; i++) {
      value = value[this._attrPaths[i]];
    }
    return this.dataBinding_fix(value);
  }


}

