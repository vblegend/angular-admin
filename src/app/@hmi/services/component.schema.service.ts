import { ComponentSchema } from "app/@hmi/configuration/component.schema";


export class ComponentSchemaService {

    private _map: Record<string, ComponentSchema>;

    /**
     *
     */
    constructor() {
        this._map = {};
    }

    public load(data: Record<string, ComponentSchema>) {
        for (const key in data) {
            if (this._map[key] == null) {
                this._map[key] = data[key];
                this._map[key].type = key;
            } else {
                console.warn(`关键字${key}已被注册，跳过当前组件：${data[key].component}`);
            }
        }
    }

    public getType(type: string): ComponentSchema {
        return this._map[type];
    }

    public register(type: string, component: ComponentSchema) {
        this._map[type] = component;
    }



}