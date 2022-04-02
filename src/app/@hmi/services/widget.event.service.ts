import { Injectable } from "@angular/core";
import { Action } from "@core/common/delegate";
import { AnyObject } from "@core/common/types";
import { BasicWidgetComponent } from "@hmi/components/basic-widget/basic.widget.component";
import { ViewCanvasComponent } from "@hmi/components/view-canvas/view.canvas.component";
import { MethodMeta } from "../core/widget.meta.data";

/**
 * 小部件的事件服务\
 * 用于小部件之间的事件联动通讯
 */
@Injectable({
  providedIn: 'root'
})
export class WidgetEventService {
  private canvas: ViewCanvasComponent;

  /**
   * 初始化 事件服务所属canvas
   * @param canvas 
   */
  public initCanvas$(canvas: ViewCanvasComponent): void {
    this.canvas = canvas;
  }

  /**
   * 派遣一个事件至目标对象
   * @param sender 发送人
   * @param receiver 接收人，为null时广播给所有小部件对象
   * @param method 事件数据
   * @param params 事件参数
   */
  public dispatch(sender: BasicWidgetComponent, receiver: string, method: string, params: AnyObject) {
    const targets = this.getEventTargets(receiver, sender);
    for (let i = 0; i < targets.length; i++) {
      const comp = targets[i].instance;
      try {
        this.eventHandle(comp, method, params);
      }
      catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * 获取事件接收人
   * @param receiver 
   * @param sender 
   * @returns 
   */
  private getEventTargets(receiver: string, sender: BasicWidgetComponent) {
    if (receiver == null) return this.canvas.children.filter(e => e.instance != sender);
    const children = this.canvas.children;
    const comp = children.find(e => e.instance.configure.id === receiver);
    if (comp == null) return [];
    return [comp];
  }



  /**
   * 事件处理
   * @param receiver 接收人
   * @param method 事件方法名
   * @param params 事件参数
   */
  private eventHandle(receiver: BasicWidgetComponent, method: string, params: AnyObject) {
    const methodMeta = receiver.metaData.interface[method];
    const methodFunc = receiver[method];
    if (method && methodFunc) {
      const args = this.getEventParams(methodMeta, params);
      if (args != null) methodFunc.apply(this, args);
    }
  }


  /**
   * 验证/获取事件参数
   * @param method 事件元数据
   * @param params 调用参数 
   * @returns 
   */
  private getEventParams(method: MethodMeta, params: AnyObject): AnyObject[] {
    const args: AnyObject[] = [];
    for (let i = 0; i < method.args.length; i++) {
      const arg = method.args[i];
      const value = params[arg.argName];
      // 严格模式下，参数不匹配则跳出
      if (method.strict && value === undefined) return;
      args[i] = value;
    }
    return args;
  }



}
