import { Injectable, OnDestroy } from "@angular/core";
import { ViewCanvasComponent } from "@hmi/components/view-canvas/view.canvas.component";
import { TimerTask, TimerTaskEventHandler } from "@core/common/timer.task";

// {
//     providedIn: 'root'
// }
@Injectable()
export class TimerPoolService implements OnDestroy {

    /**
     * 最大系统定时器数量
     */
    public MAX_TIMER_LENGTH: number = 10;

    /**
     * canvas: ViewCanvasComponent
     */
    constructor() {
        console.log('new TimerPoolService()');
    }





    /**
     * 分配一个Timer任务
     * @returns 
     */
    public allocTimer(callback: TimerTaskEventHandler, _this: any): TimerTask | null {



        return null;
    }




    /**
     * 释放一个Timer任务
     * @param task 
     */
    public freeTimer(task: TimerTask): void {

    }





    public ngOnDestroy(): void {
        console.log('ngOnDestroy TimerPoolService()');
    }
}