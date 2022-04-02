import { ObjectUtil } from "@core/util/object.util";
import { EventMeta, WidgetMetaObject } from "./widget.meta.data";



/**
 * 表示一个2维向量坐标
 */
export interface Vector2 {
    x: number;
    y: number;
}
/**
 * 表示一块矩形区域。
 */
export interface Rectangle {
    left: number;
    top: number;
    width: number;
    height: number;
}

/**
 * 定义一个Widget对象的所有可触发的事件列表\
 * 使用小部件的 this.dispatchEvent()方法触发事件\
 * 事件所使用的参数必须与事件声明里参数签名一致
 * 
 * @param options 
 */
export function WidgetEvent(events: EventMeta[]): (target: Function) => void {
    return function (target: any) {
        const metaData = target.prototype.metaData as WidgetMetaObject;
        metaData.prototype = target;
        if (events == null || events.length == 0) return;
        for (const event of events) {
            if (metaData.events[event.event] == null) {
                metaData.events[event.event] = event;
            }
        }
        ObjectUtil.freeze(metaData.events);
    };
}



/**
 * 用于声明一个Widget对外接口\
 * 接口的参数需使用{@Params}进行标注\
 * 未标注的参数将不会收到任何数据
 * @param name 定义接口名。
 * @param description 定义接口说明。
 * @param strict 参数严格性（默认为false） 当为true时只有所有参数都匹配才会触发接口事件
 * @returns 
 */
export function WidgetInterface(name: string, description: string, strict?: boolean): (target: any, methodName: string, descriptor: PropertyDescriptor) => void {
    return function (prototype: any, methodName: string, descriptor: PropertyDescriptor) {
        const metaData = prototype.metaData as WidgetMetaObject;
        metaData.prototype = prototype;
        if (metaData.interface[methodName] == null) {
            metaData.interface[methodName] = { methodName, name, description, descriptor, args: [], strict };
        }
        const method = metaData.interface[methodName];
        method.name = name;
        method.strict = strict ? true : false;
        method.description = description;
        method.descriptor = descriptor;
        method.methodName = methodName;
        ObjectUtil.freeze(metaData.interface);
    };
}

/**
 * 用于声明接口参数
 * @param argName 参数对外的名称
 * @returns 
 */
export function Params(argName: string): (target: Function, methodName: string, paramIndex: number) => void {
    return function (target: any, methodName: string, paramIndex: number) {
        const metaData = target.metaData as WidgetMetaObject;
        if (metaData.interface[methodName] == null) {
            metaData.interface[methodName] = { methodName: null, name: null, description: null, descriptor: null, args: [], strict: false };
        }
        const method = metaData.interface[methodName];
        method.args[paramIndex] = { argName, paramIndex };
    }
}
