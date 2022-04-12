import { Injectable, Injector } from "@angular/core";
import { WidgetSchemaService } from "@hmi/services/widget.schema.service";
import { WidgetSchema } from "@hmi/configuration/widget.schema";
import { ImgWidgetComponent } from "../widgets/img.widget/img.widget.component";
import { SvgWidgetComponent } from "../widgets/svg.widget/svg.widget.component";
import { TaskWidgetComponent } from "../tasks/task-widget/task.widget.component";
import { SubmitButtonWidgetComponent } from "../widgets/submit.button.widget/submit.button.widget.component";
import { WidgetCategory } from "@hmi/configuration/widget.category";



/**
 * 图片类小部件
 */
export const CustomImageWidgets: WidgetSchema[] = [
    {
        icon: 'grace-tupian1',
        name: "图片部件",
        classify: WidgetCategory.Images,
        component: ImgWidgetComponent,
        default: {
            rect: { width: 64, height: 128 },
            style: {},
            data: {},
            events: { 'click': [{ method: 'updateImg', params: { standardId: 33333 } }, { method: 'updateSvg', params: { roomId: 44444 } }] }
        },
        // properties: {
        //     // 'device': BasicPropertyComponent,
        //     // 'standard': BasicPropertyComponent,
        //     // 'datetime': BasicPropertyComponent,
        // }
    },
    {
        icon: 'grace-BIMfuneng',
        name: "SVG部件",
        classify: WidgetCategory.Images,
        component: SvgWidgetComponent,
        default: {
            rect: { width: 250, height: 100 },
            style: {},
            data: {},
            events: { 'click': [{ method: 'updateImg', params: { standardId: 33333 } }, { method: 'updateSvg', params: { roomId: 44444 } }] }
        }
    }
];


/**
 * 其他类小部件
 */
export const CustomOtherWidgets: WidgetSchema[] = [
    {
        icon: 'grace-sheshiguanli',
        name: "任务部件",
        classify: WidgetCategory.Text,
        component: TaskWidgetComponent,
        default: {
            rect: { width: 300, height: 150 },
            style: {},
            data: {},
            events: { 'click': [{ method: 'updateImg', params: { standardId: 33333 } }, { method: 'updateSvg', params: { roomId: 44444 } }] }
        }
    },
    {
        icon: 'grace-zhiwendenglu',
        name: "提交按钮",
        classify: WidgetCategory.Buttons,
        component: SubmitButtonWidgetComponent,
        default: {
            rect: { width: 86, height: 32 },
            style: {},
            data: {},
            events: { 'click': [{ method: 'updateImg', params: { standardId: 33333 } }, { method: 'updateSvg', params: { roomId: 44444 } }] }
        }
    }




];



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


