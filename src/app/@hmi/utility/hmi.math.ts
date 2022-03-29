import { Rectangle } from "@hmi/core/common";


export class HmiMath {


    /**
     * 合并两个矩形区域返回一个新的矩形区域
     * @param rect1 
     * @param rect2 
     * @returns 
     */
    public static extendsRectangle(rect1: Rectangle, rect2: Rectangle): Rectangle {
        const left = Math.min(rect1.left, rect2.left);
        const top = Math.min(rect1.top, rect2.top);
        const width = Math.max(rect1.left + rect1.width, rect2.left + rect2.width) - left;
        const height = Math.max(rect1.top + rect1.height, rect2.top + rect2.height) - top;
        return { left, top, width, height };
    }


}