import { Type } from "@angular/core";
import { BasicComponent } from "@hmi/components/basic-component/basic.component";
import { ComponentDefaultConfigure } from "./component.element.configure";


export interface ComponentSchema {
    /**
     * 组件类型
     * schema文件中不需要定义，当service load时会自动填充
     */
    type?: string;

    /**
     * 组件的图标
     * 用于在对象列表中显示
     */
    icon: string;

    /**
     * 组件的分类
     * 用于在对象列表中分类显示
     */
    classify: string;

    /**
     * 组件的名称
     * 默认名称，对象列表中显示
     */
    displayName: String;

    /**
     * 组建的实例
     */
    component: Type<BasicComponent>;

    /**
     * 组件的默认配置
     */
    default: ComponentDefaultConfigure;
}

