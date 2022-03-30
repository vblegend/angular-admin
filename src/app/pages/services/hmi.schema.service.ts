import { Injectable } from "@angular/core";
import { ComponentSchemaService } from "@hmi/services/component.schema.service";
import { ComponentSchema } from "app/@hmi/configuration/component.schema";
import { ImgViewerComponent } from "../graphics/img.viewer/img.viewer.component";
import { SvgViewerComponent } from "../graphics/svg.viewer/svg.viewer.component";




export const CustomComponentSchemas: Record<string, ComponentSchema> = {
    SvgViewer: {
        icon: '',
        classify: '',
        displayName: "Image图片",
        component: ImgViewerComponent,
        default: {
            style: {},
            data: {}
        }
    },
    ImgViewer: {
        icon: '',
        classify: '',
        displayName: "SVG图片",
        component: SvgViewerComponent,
        default: {
            style: {},
            data: {}
        }
    }
}


@Injectable({
    providedIn: 'root',
})
export class HmiSchemaService extends ComponentSchemaService {
    constructor() {
        super();
        this.load(CustomComponentSchemas)
    }
}


