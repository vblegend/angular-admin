import { ComponentFactoryResolver, ComponentRef, Injectable, Type } from "@angular/core";
import { WidgetPropertiesService } from "@hmi/services/widget.properties.service";
import { PropertiesTemplatesComponent } from "./components/properties-templates/properties.templates.component";
import { HmiEditorComponent } from "./hmi.editor.component";

interface TemplateTypeInstance {
    template: Type<PropertiesTemplatesComponent>;
    compRef: ComponentRef<PropertiesTemplatesComponent>;
}


/**
 * 属性模板管理器\
 * 用于安装和卸载属性模板
 */
@Injectable({
    providedIn: 'root'
})
export class PropertyTemplateManager {

    private readonly types: TemplateTypeInstance[] = [];

    /**
     *
     */
    constructor(private readonly editor: HmiEditorComponent, private componentFactoryResolver: ComponentFactoryResolver) {

    }

    /**
     * 安装属性模板
     * @param template 
     * @returns 
     */
    public install(template: Type<PropertiesTemplatesComponent>): void {
        if (this.types.some(e => e.template === template)) return;

        const factoryResolver = this.componentFactoryResolver.resolveComponentFactory(template);

        const compRef: ComponentRef<PropertiesTemplatesComponent> = this.editor.viewContainerRef.createComponent(factoryResolver, undefined, this.editor.injector);
        this.types.push({ template, compRef });
    }

    /**
     * 返回当前已安装模板中是否包含模板@template
     * @param template 
     */
    public contains(template: Type<PropertiesTemplatesComponent>): boolean {
        return this.types.some(e => e.template === template);
    }



    /**
     * 卸载属性模板
     * @param template 
     */
    public unInstall(template: Type<PropertiesTemplatesComponent>) : void{
        const index = this.types.findIndex(e => e.template === template);
        if (index > -1) {
            const ts = this.types.splice(index, 1);
            const indexRef = this.editor.viewContainerRef.indexOf(ts[0].compRef.hostView);
            this.editor.viewContainerRef.remove(indexRef);
            ts[0].compRef.hostView.detach();
            ts[0].compRef.hostView.destroy();
            ts[0].compRef.destroy();
        }
    }
}