import { Type } from "@angular/core";
import { BasicWidgetComponent } from "@hmi/components/basic-widget/basic.widget.component";
import { WidgetCategory } from "./widget.category";
import { WidgetDefaultConfigure } from "./widget.configure";


export interface WidgetSchema {
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
    classify: WidgetCategory;

    /**
     * 预览图片
     */
    previewImage?: string;
    /**
     * 组件的名称
     * 默认名称，对象列表中显示
     */
    name: string;

    /**
     * 组建的实例
     */
    component: Type<BasicWidgetComponent>;

    /**
     * 组件的默认配置
     */
    default: WidgetDefaultConfigure;
}

