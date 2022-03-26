import { Rectangle } from "@hmi/core/common";


/**
 * 2D组态的绑定数据结构
 */
export interface ComponentDataConfigure {

}

/**
 * 2D组态元素样式
 */
export interface ComponentStyle {
    /**
     * 组件默认背景色
     */
    background?: string;

    /**
     * 组件默认不透明度
     */
    opacity?: number;

    /**
     * 组件层级索引
     */
    zIndex?: number;
    /**
     * 固定住的 不可移动的
     */
    fixed?: boolean;
    /**
     * 是否忽略鼠标事件 默认为 false
     * 为true时鼠标事件穿透
     */
    ignoreEvent?: boolean;
}

export interface ElementLocation {
    /**
     * 左侧间距
     */
    left: number;
    /**
     * 右侧间距（未使用）
     */
    // right?: number;
    /**
     * 顶侧间距
     */
    top: number;
    /**
     * 下侧间距（未使用）
     */
    // bottom?: number;
}

export interface ElementSize {
    /**
     * 组件宽度
     */
    width: number;
    /**
     * 组件高度
     */
    height: number;
}






export interface ComponentDefaultConfigure {
    /**
     * 位置与大小
     */
    rect?: Rectangle;
    /**
     * 
     * 样式属性，主动更新。
     */
    style: ComponentStyle;

    /**
     * 组态绑定数据，被动更新 需事件通知
     */
    data: ComponentDataConfigure;
}



/**
 * 2D组态元素配置
 */
export interface ComponentConfigure extends ComponentDefaultConfigure {
    /**
     * 对象唯一ID
     */
    id: string;
    /**
     * 对象名字
     */
    name: string;

    /**
     * 对象类型
     */
    type: string;

    /**
     * 组件所属分组
     */
    group?: string;
    /**
     * 是否可见
     */
    visible?: boolean;
}