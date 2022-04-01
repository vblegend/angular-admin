import { AnyObject } from "chart.js/types/basic";

export interface MethodArgument {
    /**
     * 接口的参数名
     */
    argName: string;
    /**
     * 接口参数索引
     */
    paramIndex: number;
}


export interface MethodMeta {
    /**
     * 接口方法名称
     */
    methodName: string;
    /**
     * 接口名
     */
    name: string;
    /**
     * 是否为严格模式（默认为false）
     * 严格模式下需所有参数都被匹配才会触发
     */
    strict: boolean;
    /**
     * 接口说明
     */
    description: string;
    /**
     * 接口方法对象
     */
    descriptor: PropertyDescriptor;
    /**
    * 接口参数
    */
    args: MethodArgument[];

}

export interface EventMeta {
    /**
     * 事件名
     */
    event: string;
    /**
     * 事件的参数列表
     */
    eventParams: string[];
    /**
     * 事件说明
     */
    eventName: string;
}


/**
 * 部件的元数据对象
 */
export class WidgetMetaObject {
    private _interface: Record<string, MethodMeta>;
    private _events: Record<string, EventMeta>;
    public get interface(): Record<string, MethodMeta> { return this._interface; }
    public get events(): Record<string, EventMeta> { return this._events }
    public prototype: AnyObject;
    /**
     *
     */
    constructor() {
        this._interface = {};
        this._events = {};
    }
}