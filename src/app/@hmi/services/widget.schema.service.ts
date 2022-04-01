import { ComponentFactoryResolver, Injectable, Injector } from "@angular/core";
import { WidgetSchema } from "@hmi/configuration/widget.schema";

@Injectable({
    providedIn: 'root'
})
export class WidgetSchemaService {

    private _widgetsMap: Record<string, WidgetSchema>;
    private _widgetsArray: WidgetSchema[];
    private componentFactoryResolver: ComponentFactoryResolver;

    /**
     *
     */
    constructor(protected injector: Injector) {
        this._widgetsMap = {};
        this._widgetsArray = [];
        this.componentFactoryResolver = injector.get(ComponentFactoryResolver);
    }

    public load(data: WidgetSchema[]) {
        for (const widget of data) {
            const factory = this.componentFactoryResolver.resolveComponentFactory(widget.component);
            if (factory) {
                widget.type = factory.selector;
                Object.freeze(widget);
                if (this._widgetsMap[widget.type] == null) {
                    this._widgetsMap[widget.type] = widget;
                    this._widgetsArray.push(widget);
                } else {
                    console.warn(`关键字${widget.type}已被注册，跳过当前组件：${widget.component}`);
                }
            }
            else {
                console.warn(`未找到部件对象${widget.component}`);
            }
        }
    }

    public getType(type: string): WidgetSchema {
        return this._widgetsMap[type];
    }

    public register(type: string, component: WidgetSchema) {
        this._widgetsMap[type] = component;
    }


    public get length(): number {
        return this._widgetsArray.length;
    }

    public getIndex(index: number): WidgetSchema {
        return this._widgetsArray[index];
    }

}