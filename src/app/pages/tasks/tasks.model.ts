
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

    serviceId: string;

    lastExec?: Date;

    mode: TaskMode;


    IPAddress: string;


}