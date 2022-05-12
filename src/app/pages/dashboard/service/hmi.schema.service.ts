import { Injectable, Injector } from "@angular/core";
import { WidgetSchemaService } from "@hmi/services/widget.schema.service";
import { WidgetSchema } from "@hmi/configuration/widget.schema";
import { ImgWidgetComponent } from "../widgets/img.widget/img.widget.component";
import { SvgWidgetComponent } from "../widgets/svg.widget/svg.widget.component";
import { SubmitButtonWidgetComponent } from "../widgets/submit.button.widget/submit.button.widget.component";
import { WidgetCategory } from "@hmi/configuration/widget.category";
import { TaskWidgetComponent } from "../widgets/task-widget/task.widget.component";

/**
 * 图片类小部件
 */
export const CustomImageWidgets: WidgetSchema[] = [
    {
        icon: 'grace-iconfont23',
        name: "图片部件",
        classify: WidgetCategory.Images,
        component: ImgWidgetComponent
    },
    {
        icon: 'grace-plugin2',
        name: "SVG部件",
        classify: WidgetCategory.Images,
        component: SvgWidgetComponent
    }
];


/**
 * 其他类小部件
 */
export const CustomOtherWidgets: WidgetSchema[] = [
    {
        icon: 'grace-qiandao',
        name: "任务部件",
        classify: WidgetCategory.Text,
        component: TaskWidgetComponent
    },
    {
        icon: 'grace-zhiwendenglu',
        name: "提交按钮",
        classify: WidgetCategory.Buttons,
        component: SubmitButtonWidgetComponent
    }
];


/*
 * 小部件注册服务\
 * 用于注册程序内所有小部件
 */
@Injectable({
    providedIn: 'root',
})
export class HmiSchemaService extends WidgetSchemaService {
    constructor(protected injector: Injector) {
        super(injector);
        this.register(CustomImageWidgets);
        this.register(CustomOtherWidgets);
    }







}


