import { HmiZoomMode } from "@hmi/core/common";
import { WidgetConfigure } from "./widget.configure";



export interface GraphicConfigure {

    magic: string;

    version: number[];

    width: number;

    height: number;

    zoomMode: HmiZoomMode;

    widgets: WidgetConfigure[];
}