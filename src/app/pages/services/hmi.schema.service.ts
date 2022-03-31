import { Injectable, Injector } from "@angular/core";
import { WidgetSchemaService } from "@hmi/services/widget.schema.service";
import { WidgetSchema } from "@hmi/configuration/widget.schema";
import { ImgWidgetComponent } from "../widgets/img.widget/img.widget.component";
import { SvgWidgetComponent } from "../widgets/svg.widget/svg.widget.component";
import { TaskWidgetComponent } from "../tasks/task-widget/task.widget.component";




export const CustomWidgets: WidgetSchema[] = [
    {
        icon: '',
        name: "图片部件",
        classify: '',
        component: ImgWidgetComponent,
        default: {
            style: {},
            data: {}
        }
    },
    {
        icon: '',
        name: "SVG部件",
        classify: '',
        component: SvgWidgetComponent,
        default: {
            style: {},
            data: {}
        }
    },
    {
        icon: '',
        name: "任务部件",
        classify: '',
        component: TaskWidgetComponent,
        default: {
            style: {},
            data: {}
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


