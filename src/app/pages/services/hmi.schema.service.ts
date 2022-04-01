import { Injectable, Injector } from "@angular/core";
import { WidgetSchemaService } from "@hmi/services/widget.schema.service";
import { WidgetSchema } from "@hmi/configuration/widget.schema";
import { ImgWidgetComponent } from "../widgets/img.widget/img.widget.component";
import { SvgWidgetComponent } from "../widgets/svg.widget/svg.widget.component";
import { TaskWidgetComponent } from "../tasks/task-widget/task.widget.component";
import { SubmitButtonWidgetComponent } from "../widgets/submit.button.widget/submit.button.widget.component";




export const CustomWidgets: WidgetSchema[] = [
    {
        icon: '',
        name: "图片部件",
        classify: '',
        component: ImgWidgetComponent,
        default: {
            rect: {
                left: 0,
                top: 0,
                width: 64,
                height: 128
            },
            style: {},
            data: {},
            events: { 'click': [{ method: 'updateImg', params: { standardId: 33333 } }, { method: 'updateSvg', params: { roomId: 44444 } }] }
        }
    },
    {
        icon: '',
        name: "SVG部件",
        classify: '',
        component: SvgWidgetComponent,
        default: {
            rect: {
                left: 0,
                top: 0,
                width: 250,
                height: 100
            },
            style: {},
            data: {},
            events: { 'click': [{ method: 'updateImg', params: { standardId: 33333 } }, { method: 'updateSvg', params: { roomId: 44444 } }] }
        }
    },
    {
        icon: '',
        name: "任务部件",
        classify: '',
        component: TaskWidgetComponent,
        default: {
            rect: {
                left: 0,
                top: 0,
                width: 300,
                height: 150
            },
            style: {},
            data: {},
            events: { 'click': [{ method: 'updateImg', params: { standardId: 33333 } }, { method: 'updateSvg', params: { roomId: 44444 } }] }
        }
    },
    {
        icon: '',
        name: "提交按钮",
        classify: '',
        component: SubmitButtonWidgetComponent,
        default: {
            rect: {
                left: 0,
                top: 0,
                width: 86,
                height: 32
            },
            style: {
            },
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
        this.load(CustomWidgets)
    }
}


