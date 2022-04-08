import { Component, ComponentRef, HostBinding, Injector, Input } from '@angular/core';
import { GenericComponent } from '@core/components/basic/generic.component';
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
  @Input() editor: HmiEditorComponent;

  public get objects(): ComponentRef<BasicWidgetComponent>[] {
    return this.editor.selection.objects;
  }

  public get object(): ComponentRef<BasicWidgetComponent> {
    return this.editor.selection.objects[0];
  }


  public get configure(): WidgetConfigure {
    return this.editor.selection.objects[0].instance.configure;
  }

  

}
