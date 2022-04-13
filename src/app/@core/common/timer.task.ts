export class TimerTask {

    private _counter: number;

    private _runOfLastTime: number;

    private _interval: number;

    public _isExecuteing : boolean ;

    /**
     *
     */
    private constructor() {
        this._counter = 0;
        this._runOfLastTime = 0;
        this._interval = 0;
        this._isExecuteing = false;
    }


    /**
     * 临时中断任务
     */


    public suspend(): void {

    }

    /**
     * 继续执行任务
     */
    public continue(): void {

    }

    /**
     * 取消任务（取消后不能继续）
     */
    public cancel(): void {

    }

    /**
     * 获取 触发次数
     */
    public get counter(): number {
        return this._counter;
    }



    public get interval(): number {
        return this._interval;
    }



    public execute():void{

    }


}

export declare type TimerTaskEventHandler = (task: TimerTask) => void;
