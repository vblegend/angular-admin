import { Type } from "@angular/core";
import { BasicWidgetComponent } from "@hmi/components/basic-widget/basic.widget.component";
import { WidgetDefaultConfigure } from "@hmi/configuration/widget.configure";



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


export enum EventBusMessages {
    ObjectChanged = 0,
    UpdateParams = 1,
    MouseEnterObject = 2,
    MouseLeaveObject = 3
}






export interface EventBusMessage<T> {
    target : BasicWidgetComponent;
    identity: string;
    type: EventBusMessages;
    data: T;
}


export interface Widget {
    // type?: string;
    // icon: string;
    // name: String;
    // classify: string;
    // component?: Type<BasicWidgetComponent>;
    // default: WidgetDefaultConfigure;
}

/**
 * 定义一个Widget对象
 * 不适用于懒加载方案
 * @param options 
 */
export function Widget(options?: Widget): (target: Function) => void {
    return function (target: Function) {
        // options.component = <Type<BasicWidgetComponent>>target;
        target.prototype.DEFINE_EVENT = options;
    };
}
