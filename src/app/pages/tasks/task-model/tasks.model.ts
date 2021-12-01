
export enum TaskMode {
    /* 自动的 */
    Automatic = 0,
    /* 手动的 */
    Manual = 1,
}

export interface SchedulingTask {


    taskId: number;

    taskName: string;

    service: string;

    online:boolean;
    serviceId: string;

    lastExec?: Date;

    mode: TaskMode;


    ipAddress: string;


}