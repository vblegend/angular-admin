import { WidgetDataConfigure } from "@hmi/configuration/widget.configure";

/**
 * 图片小部件的数据属性
 */
export interface ImageWidgetDataModel extends WidgetDataConfigure {
    /**
     * 图片地址
     */
    imgSrc: string | null | undefined;
}